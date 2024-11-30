import { Text, View, StyleSheet } from "react-native";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>More screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#25292e",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 30,
  },
});
