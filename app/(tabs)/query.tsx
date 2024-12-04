import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

interface Query {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Resolved';
  date: string;
}

export default function MoreScreen(): JSX.Element {
  const [queryTitle, setQueryTitle] = useState<string>('');
  const [queryDescription, setQueryDescription] = useState<string>('');
  const [previousQueries, setPreviousQueries] = useState<Query[]>([
    {
      id: '1',
      title: 'Incorrect Fine Amount',
      description: 'The fine amount charged is higher than stated in the violation notice.',
      status: 'Pending',
      date: '2024-03-01',
    },
    {
      id: '2',
      title: 'Wrong Vehicle Information',
      description: 'The ticket was issued to the wrong vehicle registration number.',
      status: 'Resolved',
      date: '2024-02-25',
    },
  ]);

  const submitQuery = (): void => {
    if (!queryTitle.trim() || !queryDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newQuery: Query = {
      id: String(previousQueries.length + 1),
      title: queryTitle,
      description: queryDescription,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
    };

    setPreviousQueries([newQuery, ...previousQueries]);
    setQueryTitle('');
    setQueryDescription('');
    Alert.alert('Success', 'Your query has been submitted successfully');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Raise a Query</Text>
          </View>

          {/* New Query Form */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Submit New Query</Text>
            <View style={styles.cardContent}>
              <Text style={styles.label}>Query Title</Text>
              <TextInput
                style={styles.input}
                value={queryTitle}
                onChangeText={setQueryTitle}
                placeholder="Enter query title"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={queryDescription}
                onChangeText={setQueryDescription}
                placeholder="Describe your concern in detail"
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity style={styles.submitButton} onPress={submitQuery}>
                <Text style={styles.submitButtonText}>Submit Query</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Previous Queries */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Previous Queries</Text>
            {previousQueries.map((query) => (
              <View key={query.id} style={styles.queryItem}>
                <View style={styles.queryHeader}>
                  <Text style={styles.queryTitle}>{query.title}</Text>
                  <Text
                    style={[
                      styles.queryStatus,
                      query.status === 'Pending' ? styles.statusPending : styles.statusResolved,
                    ]}
                  >
                    {query.status}
                  </Text>
                </View>
                <Text style={styles.queryDescription}>{query.description}</Text>
                <Text style={styles.queryDate}>Submitted on: {query.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  container: { padding: 16 },
  header: { marginBottom: 16 },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardContent: { marginBottom: 16 },
  label: { fontSize: 14, marginBottom: 4, color: '#333' },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  queryItem: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 8, marginBottom: 10 },
  queryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  queryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', flex: 1 },
  queryStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: { backgroundColor: '#FFF3CD', color: '#856404' },
  statusResolved: { backgroundColor: '#D4EDDA', color: '#155724' },
  queryDescription: { fontSize: 14, color: '#666', marginBottom: 8 },
  queryDate: { fontSize: 12, color: '#999' },
});
