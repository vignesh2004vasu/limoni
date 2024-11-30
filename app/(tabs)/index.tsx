
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello vignesh</Text>
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
  button: {
    color: "#FFFFFF",
    fontSize: 20,
    textDecorationLine: "underline",
  },
});
