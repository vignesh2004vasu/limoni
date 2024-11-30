import React, { useEffect, useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "expo-router";

const INITIAL_REGION = {
  latitude: 10.932127952575684,
  longitude: 76.92491149902344,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType="satellite"
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
      />
      <Marker
        coordinate={{
          latitude: 10.932127952575684,
          longitude: 76.92491149902344,
        }}
        title="Marker Title"
        description="Marker Description"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
