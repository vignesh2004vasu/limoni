import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      router.replace("/");
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
          headerTitle: "Admin page",
          tabBarLabel:"Admin",
          
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "analytics-sharp" : "analytics-outline"}
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
