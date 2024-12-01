import { Stack } from "expo-router";
import { LogBox } from "react-native";
import { PaperProvider } from 'react-native-paper';
LogBox.ignoreAllLogs();
export default function RootLayout() {
  return (
    <PaperProvider>
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
    </PaperProvider>

  );
}
