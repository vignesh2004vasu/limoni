import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  onPress?: () => void; // Optional onPress handler
}

const InfoCard = ({ title, children, onPress }: InfoCardProps) => (
  <TouchableWithoutFeedback onPress={onPress} disabled={!onPress}>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
  </TouchableWithoutFeedback>
);

export default function Index() {
  const router = useRouter();

  const userData = {
    name: "Vignesh Vasu",
    license: {
      number: "TN5719940002345",
      expiry: "2025-12-31",
      status: "Active",
    },
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2022",
      plateNumber: "TN 07 BC 1234",
    },
    tickets: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 100,
        status: "Unpaid",
        type: "Parking",
      },
      {
        id: 2,
        date: "2024-02-20",
        amount: 150,
        status: "Unpaid",
        type: "Speeding",
      },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Welcome back,</Text>
            <Text style={styles.userName}>{userData.name}</Text>
          </View>

          <InfoCard title="License Information">
            <Text style={styles.label}>
              License Number: {userData.license.number}
            </Text>
            <Text style={styles.label}>Expiry: {userData.license.expiry}</Text>
            <Text style={styles.label}>
              Status:{" "}
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      userData.license.status === "Active"
                        ? "#4CAF50"
                        : "#F44336",
                  },
                ]}
              >
                {userData.license.status}
              </Text>
            </Text>
          </InfoCard>

          <InfoCard title="Vehicle Details">
            <Text style={styles.label}>
              Vehicle: {userData.vehicle.year} {userData.vehicle.make}{" "}
              {userData.vehicle.model}
            </Text>
            <Text style={styles.label}>
              Plate Number: {userData.vehicle.plateNumber}
            </Text>
          </InfoCard>

          <InfoCard
            title="Unpaid Tickets"
            onPress={() => router.push("/(tabs)/tickets")} // Navigate to Tickets page
          >
            {userData.tickets.map((ticket) => (
              <View key={ticket.id} style={styles.ticketItem}>
                <Text style={styles.label}>
                  {ticket.date} - {ticket.type}
                </Text>
                <Text style={styles.amount}>₹{ticket.amount}</Text>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalAmount}>
                Total Due: ₹
                {userData.tickets.reduce(
                  (sum, ticket) => sum + ticket.amount,
                  0
                )}
              </Text>
            </View>
          </InfoCard>

          <InfoCard title="Statistics">
            <View style={styles.statsPlaceholder}>
              <Text style={styles.placeholderText}>
                Monthly Violation Summary
              </Text>
              <View style={styles.barContainer}>
                {[1, 2, 0, 1, 0, 1].map((value, index) => (
                  <View key={index} style={styles.barWrapper}>
                    <View style={[styles.bar, { height: value * 40 }]} />
                    <Text style={styles.barLabel}>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </InfoCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#333",
  },
  userName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  cardContent: {
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  status: {
    fontWeight: "bold",
  },
  ticketItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
  },
  totalContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F44336",
    textAlign: "right",
  },
  statsPlaceholder: {
    padding: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  barContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingVertical: 10,
  },
  barWrapper: {
    alignItems: "center",
    width: 30,
  },
  bar: {
    width: 20,
    backgroundColor: "#007AFF",
    borderRadius: 3,
  },
  barLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#666",
  },
});
