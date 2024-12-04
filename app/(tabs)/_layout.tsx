import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/(auth)/index");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#000000",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home page",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              size={30}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color="white"
              onPress={handleLogout} // Logout on press
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tickets"
        options={{
          headerTitle: "Ticket page",
          tabBarLabel: "Ticket",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "ticket-sharp" : "ticket-outline"}
              size={30}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color="white"
              onPress={handleLogout} // Logout on press
            />
          ),
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          headerTitle: "Speed Zone Limits",
          tabBarLabel: "Map",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "map-sharp" : "map-outline"}
              size={30}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color="white"
              onPress={handleLogout} // Logout on press
            />
          ),
        }}
      />
      <Tabs.Screen
        name="query"
        options={{
          headerTitle: "Query page",
          tabBarLabel: "Query",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "alert-circle" : "alert-circle-outline"}
              size={30}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color="white"
              onPress={handleLogout} // Logout on press
            />
          ),
        }}
      />
      <Tabs.Screen
        name="nominee"
        options={{
          headerTitle: "Nominee page",
          tabBarLabel: "Nominee",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "people-circle-sharp" : "people-circle-outline"}
              size={30}
              color={color}
            />
          ),
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color="white"
              onPress={handleLogout} // Logout on press
            />
          ),
        }}
      />
    </Tabs>
  );
}
