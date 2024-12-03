import React, { useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

interface Zone {
  district: string;
  zone_type: string;
  example: string;
  speed_limit: string;
  latitude: number;
  longitude: number;
}

const INITIAL_REGION = {
  latitude: 11.0182714,
  longitude: 76.9677744,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};

const zoneData: Zone[] = [
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Avinashi Road",
    speed_limit: "50-70 km/h",
    latitude: 11.00863239,
    longitude: 76.97917417,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Trichy Road",
    speed_limit: "50-70 km/h",
    latitude: 11.00554783,
    longitude: 77.06760145,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Peelamedu Road",
    speed_limit: "50-70 km/h",
    latitude: 11.00138351,
    longitude: 77.02919677,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Coimbatore-Pollachi Road",
    speed_limit: "50-70 km/h",
    latitude: 10.88455679,
    longitude: 77.0011343,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Palakkad Road",
    speed_limit: "50-70 km/h",
    latitude: 10.6769485,
    longitude: 76.94475986,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Mettupalayam Road",
    speed_limit: "50-70 km/h",
    latitude: 11.02763934,
    longitude: 76.95118195,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Saibaba Colony Road",
    speed_limit: "50-70 km/h",
    latitude: 11.026008,
    longitude: 76.9427799,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Avarampalayam Road",
    speed_limit: "50-70 km/h",
    latitude: 11.02287544,
    longitude: 76.97815386,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Coimbatore-Ooty Road",
    speed_limit: "50-70 km/h",
    latitude: 11.3045778,
    longitude: 76.9364311,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Town Hall Road",
    speed_limit: "50-70 km/h",
    latitude: 10.997244,
    longitude: 76.957589,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Singanallur Road",
    speed_limit: "50-70 km/h",
    latitude: 11.00158394,
    longitude: 77.02897355,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Ram Nagar Road",
    speed_limit: "50-70 km/h",
    latitude: 11.2459985,
    longitude: 77.1014899,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Nanjappa Road",
    speed_limit: "50-70 km/h",
    latitude: 11.00606212,
    longitude: 76.96654555,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Uppilipalayam Road",
    speed_limit: "50-70 km/h",
    latitude: 11.0058676,
    longitude: 77.01950445,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Barathiar Road",
    speed_limit: "50-70 km/h",
    latitude: 11.054467,
    longitude: 76.991917,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Gandhipuram Road",
    speed_limit: "50-70 km/h",
    latitude: 11.0165093,
    longitude: 76.96996706,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Perur Bypass Road",
    speed_limit: "50-70 km/h",
    latitude: 10.966183,
    longitude: 76.934381,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Thudiyalur Road",
    speed_limit: "50-70 km/h",
    latitude: 11.08046114,
    longitude: 76.9426008,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Siruvani Road",
    speed_limit: "50-70 km/h",
    latitude: 10.95342389,
    longitude: 76.70097464,
  },
  {
    district: "Coimbatore",
    zone_type: "Primary Roads",
    example: "Avinaashi Road",
    speed_limit: "50-70 km/h",
    latitude: 11.0254,
    longitude: 77.014723,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "RS Puram",
    speed_limit: "20-40 km/h",
    latitude: 11.0080177,
    longitude: 76.9501661,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Saibaba Colony",
    speed_limit: "20-40 km/h",
    latitude: 11.024334,
    longitude: 76.9447875,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Gandhipuram",
    speed_limit: "20-40 km/h",
    latitude: 11.0182714,
    longitude: 76.9677744,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Peelamedu",
    speed_limit: "20-40 km/h",
    latitude: 11.0269577,
    longitude: 76.9945813,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Race Course",
    speed_limit: "20-40 km/h",
    latitude: 11.0010788,
    longitude: 76.97796193,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Ram Nagar",
    speed_limit: "20-40 km/h",
    latitude: 11.0136544,
    longitude: 76.9628953,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Singanallur",
    speed_limit: "20-40 km/h",
    latitude: 11.0124691,
    longitude: 77.0391191,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Thadagam",
    speed_limit: "20-40 km/h",
    latitude: 11.0815806,
    longitude: 76.8652221,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Coimbatore North",
    speed_limit: "20-40 km/h",
    latitude: 11.0183356,
    longitude: 76.9557215,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Coimbatore South",
    speed_limit: "20-40 km/h",
    latitude: 10.93346455,
    longitude: 76.86390394,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Uppilipalayam",
    speed_limit: "20-40 km/h",
    latitude: 11.011709,
    longitude: 77.0213881,
  },
  {
    district: "Coimbatore",
    zone_type: "Residential Areas",
    example: "Avarampalayam",
    speed_limit: "20-40 km/h",
    latitude: 11.029412,
    longitude: 76.9854653,
  },
  {
    district: "Coimbatore",
    zone_type: "Commercial Areas",
    example: "RS Puram Commercial Street",
    speed_limit: "20-30 km/h",
    latitude: 10.665965,
    longitude: 77.02255,
  },
  {
    district: "Coimbatore",
    zone_type: "Commercial Areas",
    example: "Gandhipuram Market Complex",
    speed_limit: "20-30 km/h",
    latitude: 13.066388,
    longitude: 80.198193,
  },
  {
    district: "Coimbatore",
    zone_type: "Commercial Areas",
    example: "DB Road",
    speed_limit: "20-30 km/h",
    latitude: 11.007428,
    longitude: 76.950887,
  },
  {
    district: "Coimbatore",
    zone_type: "Commercial Areas",
    example: "Hope College Road",
    speed_limit: "20-30 km/h",
    latitude: 11.0257673,
    longitude: 77.0166097,
  },
  {
    district: "Coimbatore",
    zone_type: "Commercial Areas",
    example: "Brookfields",
    speed_limit: "20-30 km/h",
    latitude: 11.016009,
    longitude: 76.97031,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "PSG College of Technology",
    speed_limit: "20-30 km/h",
    latitude: 11.0246833,
    longitude: 77.00284246,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "Coimbatore Institute of Technology",
    speed_limit: "20-30 km/h",
    latitude: 11.02769985,
    longitude: 77.02736927,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "Bharathiar University",
    speed_limit: "20-30 km/h",
    latitude: 11.03695735,
    longitude: 76.87926944,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "Government College of Technology",
    speed_limit: "20-30 km/h",
    latitude: 11.018482,
    longitude: 76.9364446,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "PSG Arts College",
    speed_limit: "20-30 km/h",
    latitude: 11.0350487,
    longitude: 77.0337109,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "PSG Medical College",
    speed_limit: "20-30 km/h",
    latitude: 11.0187846,
    longitude: 77.00889204,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "Amrita Vishwa Vidyapeetham",
    speed_limit: "20-30 km/h",
    latitude: 10.903351,
    longitude: 76.899025,
  },
  {
    district: "Coimbatore",
    zone_type: "Educational Institutions",
    example: "Kongu Engineering College",
    speed_limit: "20-30 km/h",
    latitude: 23.146247,
    longitude: 75.796985,
  },
  {
    district: "Coimbatore",
    zone_type: "Hospitals",
    example: "Coimbatore Medical College Hospital",
    speed_limit: "20-30 km/h",
    latitude: 10.9964193,
    longitude: 76.97019596,
  },
  {
    district: "Coimbatore",
    zone_type: "Hospitals",
    example: "GKNM Hospital",
    speed_limit: "20-30 km/h",
    latitude: 11.01183625,
    longitude: 76.98060092,
  },
  {
    district: "Coimbatore",
    zone_type: "Hospitals",
    example: "PSG Hospitals",
    speed_limit: "20-30 km/h",
    latitude: 11.0188398,
    longitude: 77.0073136,
  },
  {
    district: "Coimbatore",
    zone_type: "Hospitals",
    example: "KMCH Hospital",
    speed_limit: "20-30 km/h",
    latitude: 38.48539,
    longitude: -90.294693,
  },
  {
    district: "Coimbatore",
    zone_type: "Hospitals",
    example: "Sri Ramakrishna Hospital",
    speed_limit: "20-30 km/h",
    latitude: 11.0236666,
    longitude: 76.97651464,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Perur Pateeswarar Temple",
    speed_limit: "20-30 km/h",
    latitude: 10.976078,
    longitude: 76.91532,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Kovai Mariamman Temple",
    speed_limit: "20-30 km/h",
    latitude: 11.146784,
    longitude: 77.319296,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Marudhamalai Murugan Temple",
    speed_limit: "20-30 km/h",
    latitude: 11.0461899,
    longitude: 76.8525785,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Eachanari Vinayagar Temple",
    speed_limit: "20-30 km/h",
    latitude: 10.9239252,
    longitude: 76.98245042,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Dhyanalinga",
    speed_limit: "20-30 km/h",
    latitude: 10.9780208,
    longitude: 76.73536977,
  },
  {
    district: "Coimbatore",
    zone_type: "Religious Places",
    example: "Isha Yoga Center",
    speed_limit: "20-30 km/h",
    latitude: 10.97723905,
    longitude: 76.7375048,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Nilgiri Hills",
    speed_limit: "40-60 km/h",
    latitude: -29.98951,
    longitude: 30.920429,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Ooty",
    speed_limit: "40-60 km/h",
    latitude: 11.30537504,
    longitude: 76.93527633,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Kotagiri",
    speed_limit: "40-60 km/h",
    latitude: 11.30998568,
    longitude: 76.93338348,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Valparai",
    speed_limit: "40-60 km/h",
    latitude: 10.3279931,
    longitude: 76.9557258,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Monkey Falls",
    speed_limit: "20-40 km/h",
    latitude: 10.4595162,
    longitude: 76.9682778,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Catherine Falls",
    speed_limit: "20-40 km/h",
    latitude: 43.297811,
    longitude: -73.579908,
  },
  {
    district: "Coimbatore",
    zone_type: "Tourist Attractions",
    example: "Doddabetta Peak",
    speed_limit: "20-40 km/h",
    latitude: 11.127312,
    longitude: 76.861168,
  },
  {
    district: "Coimbatore",
    zone_type: "Industrial Areas",
    example: "SIDCO Industrial Estate",
    speed_limit: "40-60 km/h",
    latitude: 10.943902,
    longitude: 76.975882,
  },
  {
    district: "Coimbatore",
    zone_type: "Industrial Areas",
    example: "TIDCO Industrial Estate",
    speed_limit: "40-60 km/h",
    latitude: 10.943902,
    longitude: 76.975882,
  },
  {
    district: "Coimbatore",
    zone_type: "Industrial Areas",
    example: "Kalapatti Industrial Estate",
    speed_limit: "40-60 km/h",
    latitude: 11.041036,
    longitude: 77.038905,
  },
];

export default function App() {
  const [zones] = useState<Zone[]>(zoneData);

  const getPinColor = (speedLimit: string): string => {
    const maxSpeed = parseInt(speedLimit.split("-")[1]);
    if (maxSpeed <= 40) return "green";
    if (maxSpeed <= 60) return "orange";
    return "red";
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
      >
        {zones.map((zone, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
            title={zone.example}
            description={`${zone.zone_type}, Speed Limit: ${zone.speed_limit}`}
            pinColor={getPinColor(zone.speed_limit)}
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
