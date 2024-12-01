import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Alert } from "react-native";

interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Location {
  title: string;
  location: Coordinate;
  description: string;
  speedLimit: number;
}

interface MapPressEvent {
  nativeEvent: {
    coordinate: Coordinate;
  };
}

const initialLocations: Location[] = [
  {
    title: "Home1",
    location: { latitude: 10.932127952575684, longitude: 76.92491149902344 },
    description: "My home",
    speedLimit: 50,
  },
  {
    title: "College",
    location: { latitude: 10.925861, longitude: 76.9224673 },
    description: "My college",
    speedLimit: 40,
  },
  {
    title: "Gandhipuram",
    location: { latitude: 11.0182714, longitude: 76.9677744 },
    description: "Gandhipuram",
    speedLimit: 30,
  },
  {
    title: "E Bus Stand",
    location: { latitude: 11.3468483, longitude: 77.720001 },
    description: "Bus stand",
    speedLimit: 60,
  },
  {
    title: "K Bus Stand",
    location: { latitude: 11.0063238, longitude: 77.5606106 },
    description: "Bus stand",
    speedLimit: 70,
  },
];

const INITIAL_REGION = {
  latitude: 10.932127952575684,
  longitude: 76.92491149902344,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function App() {
  const [locations, setLocations] = useState<Location[]>(initialLocations);

  const handleLongPress = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    Alert.prompt(
      "Add New Zone",
      "Enter details for the new zone:",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add",
          onPress: (input) => {
            setLocations((prev) => [
              ...prev,
              {
                title: `Zone ${prev.length + 1}`,
                location: { latitude, longitude },
                description: input || "New Zone",
                speedLimit: 50, // Default speed limit
              },
            ]);
          },
        },
      ],
      "plain-text"
    );
  };

  const getPinColor = (speedLimit: number): string => {
    if (speedLimit <= 40) return "green";
    if (speedLimit <= 60) return "orange";
    return "red";
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        onLongPress={handleLongPress}
      >
        {locations.map((item, index) => (
          <Marker
            key={index}
            coordinate={item.location}
            title={item.title}
            description={item.description}
            pinColor={getPinColor(item.speedLimit)}
          />
        ))}
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
