import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

let loc = [
  {
    title: "Home1",
    location: {
      latitude: 10.932127952575684,
      longitude: 76.92491149902344,
    },
    description: "My home",
  },
  {
    title: "college",
    location: {
      latitude: 10.925861,
      longitude: 76.9224673,
    },
    description: "my college",
  },
  {
    title: " E bustand",
    location: {
      latitude: 11.3468483,
      longitude: 77.720001,
    },
    description: "my college",
  },
  {
    title: " k bustand",
    location: {
      latitude: 11.0063238,
      longitude: 77.5606106,
    },
    description: "my college",
  },
];

const INITIAL_REGION = {
  latitude: 10.932127952575684,
  longitude: 76.92491149902344,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  const sl = () => {
    return loc.map((item, index) => {
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
          pinColor="blue"
        />
      );
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
      >
        {sl()} {/* Markers are now inside the MapView */}
      </MapView>
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
