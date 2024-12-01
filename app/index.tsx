import React, { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.31.148:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      const userData = response.data.message;
      const token = response.data.token;

      if (userData) {
        await AsyncStorage.setItem("user", userData);
        await AsyncStorage.setItem("token", token);

        Alert.alert("Success", "Login successful!");
        router.push("/(tabs)"); // Navigate to tabs after login
      } else {
        Alert.alert("Error", "Invalid user data received");
      }
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
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerLink}>Register here</Text>
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
  registerContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#555",
  },
  registerLink: {
    fontSize: 14,
    color: "#007bff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default LoginScreen;
