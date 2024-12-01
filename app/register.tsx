import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.31.148:3000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      Alert.alert("Success", response.data.message);
      router.push("/"); // Navigate to login screen after successful registration
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert(
          "Error",
          error.response?.data?.error || "Something went wrong."
        );
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={styles.loginLink}>Login here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: { backgroundColor: "#007bff", padding: 16, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  loginContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default RegisterScreen;
