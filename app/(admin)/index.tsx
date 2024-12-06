import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';

interface Violation {
  id: string;
  userId: string;
  type: string;
  date: string;
  description: string;
  evidence: string;
  status: 'pending' | 'fined' | 'dismissed'; // Restricting status to these values
  fineAmount: string;
}

const ViolationReviewScreen = () => {
  const [violations, setViolations] = useState<Violation[]>([
    {
      id: '1',
      userId: 'USER123',
      type: 'Speeding',
      date: '2024-12-06',
      description: 'Exceeded speed limit by 20mph',
      evidence: 'Speed camera footage',
      status: 'pending',
      fineAmount: '',
    },
    {
      id: '2',
      userId: 'USER456',
      type: 'Parking',
      date: '2024-12-06',
      description: 'Parked in handicap space without permit',
      evidence: 'Parking officer photo',
      status: 'pending',
      fineAmount: '',
    },
  ]);

  // Typing the parameters of handleFineDecision
  const handleFineDecision = (
    id: string, 
    decision: 'fined' | 'dismissed', 
    amount: string = ''
  ) => {
    setViolations(prevViolations =>
      prevViolations.map(violation =>
        violation.id === id
          ? { ...violation, status: decision, fineAmount: amount }
          : violation
      )
    );

    Alert.alert(
      'Success',
      `Violation ${id} has been ${decision === 'fined' ? 'fined' : 'dismissed'}`,
      [{ text: 'OK' }]
    );
  };

  // Typing the props for ViolationCard
  const ViolationCard = ({ item }: { item: Violation }) => {
    const [fineAmount, setFineAmount] = useState<string>('');

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.violationType}>{item.type} Violation</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.label}>User ID:</Text>
          <Text>{item.userId}</Text>

          <Text style={styles.label}>Description:</Text>
          <Text>{item.description}</Text>

          <Text style={styles.label}>Evidence:</Text>
          <Text>{item.evidence}</Text>
        </View>

        {item.status === 'pending' && (
          <View style={styles.actionContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter fine amount"
              keyboardType="numeric"
              value={fineAmount}
              onChangeText={setFineAmount}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.fineButton]}
                onPress={() => handleFineDecision(item.id, 'fined', fineAmount)}
              >
                <Text style={styles.buttonText}>Issue Fine</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.dismissButton]}
                onPress={() => handleFineDecision(item.id, 'dismissed')}
              >
                <Text style={styles.buttonText}>Dismiss</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {item.status !== 'pending' && (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Status: {item.status.toUpperCase()}
              {item.status === 'fined' && ` - $${item.fineAmount}`}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Violation Review</Text>
      <FlatList
        data={violations}
        renderItem={({ item }) => <ViolationCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#333',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  violationType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    color: '#666',
  },
  details: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  fineButton: {
    backgroundColor: '#007AFF',
  },
  dismissButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  statusContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
  statusText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#666',
  },
});

export default ViolationReviewScreen;
