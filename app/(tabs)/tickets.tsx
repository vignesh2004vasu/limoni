import React from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define the Ticket type
interface Ticket {
  id: string;
  violationType: string;
  location: string;
  date: string;
  fineAmount: string;
  status: "Pending" | "Paid" | "Overdue";
}

// Sample ticket data
const ticketsData: Ticket[] = [
  {
    id: "1",
    violationType: "Speeding",
    location: "Main Street",
    date: "2024-11-30",
    fineAmount: "$150",
    status: "Pending",
  },
  {
    id: "2",
    violationType: "Red Light",
    location: "5th Avenue",
    date: "2024-11-28",
    fineAmount: "$100",
    status: "Overdue",
  },
  {
    id: "3",
    violationType: "Illegal Parking",
    location: "Market Street",
    date: "2024-11-25",
    fineAmount: "$50",
    status: "Paid",
  },
];

// Summary card component
const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={[styles.summaryValue, { color }]}>{value}</Text>
  </View>
);

export default function AboutScreen() {
  // Calculate summary data
  const totalFines = ticketsData.reduce(
    (sum, ticket) => sum + parseInt(ticket.fineAmount.replace("$", "")),
    0
  );
  const pendingTickets = ticketsData.filter(
    (t) => t.status === "Pending"
  ).length;
  const overdueTickets = ticketsData.filter(
    (t) => t.status === "Overdue"
  ).length;

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "Paid":
        return "#4CAF50";
      case "Pending":
        return "#FFC107";
      case "Overdue":
        return "#F44336";
      default:
        return "#000000";
    }
  };

  const renderItem = ({ item }: { item: Ticket }) => (
    <View style={styles.ticketContainer}>
      <View style={styles.ticketHeader}>
        <Text style={styles.violationType}>{item.violationType}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.ticketDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Location:</Text>
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Date:</Text>
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fine:</Text>
          <Text style={[styles.detailText, styles.fineAmount]}>
            {item.fineAmount}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Violation History</Text>

        <View style={styles.summaryContainer}>
          <SummaryCard
            title="Total Fines"
            value={`$${totalFines}`}
            color="#F44336"
          />
          <SummaryCard
            title="Pending"
            value={pendingTickets.toString()}
            color="#FFC107"
          />
          <SummaryCard
            title="Overdue"
            value={overdueTickets.toString()}
            color="#F44336"
          />
        </View>

        <FlatList
          data={ticketsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    color: "#333333",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    width: Dimensions.get("window").width / 3.7,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryTitle: {
    color: "#666666",
    fontSize: 12,
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  ticketContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  violationType: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  ticketDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    color: "#666666",
    fontSize: 14,
  },
  detailText: {
    color: "#333333",
    fontSize: 14,
  },
  fineAmount: {
    fontWeight: "bold",
    color: "#F44336",
  },
});