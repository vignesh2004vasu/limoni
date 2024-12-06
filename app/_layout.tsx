import { Stack, Redirect, useRouter } from "expo-router";
import { LogBox } from "react-native";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";

LogBox.ignoreAllLogs();

const CustomHeader = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#25293d",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image
          source={require("../assets/images/favicon.png")} // Replace with your logo path
          style={{ width: 50, height: 50 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: 10,
          fontSize: 20,
          fontWeight: "bold",
          color: "#FFFFFF",
        }}
      >
        LIMONI
      </Text>
    </View>
  );
};

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error checking authentication", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: () => <CustomHeader />, // Custom header for the login page
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: true,
            header: () => <CustomHeader />, // Custom header for the register page
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(admin)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="+not-found"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      {isAuthenticated && <Redirect href={"/(tabs)"} />}
    </PaperProvider>
  );
}
