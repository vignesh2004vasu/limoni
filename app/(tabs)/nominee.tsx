import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface Nominee {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  sharePercentage: string;
}

interface NomineeFormData {
  name: string;
  relationship: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  sharePercentage: string;
}

const initialFormData: NomineeFormData = {
  name: '',
  relationship: '',
  dateOfBirth: '',
  phoneNumber: '',
  address: '',
  sharePercentage: '',
};

const NomineePage: React.FC = () => {
  const [nominees, setNominees] = useState<Nominee[]>([]);
  const [formData, setFormData] = useState<NomineeFormData>(initialFormData);
  const [editingId, setEditingId] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!formData.name || !formData.relationship || !formData.dateOfBirth || 
        !formData.phoneNumber || !formData.address || !formData.sharePercentage) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    const share = parseFloat(formData.sharePercentage);
    if (isNaN(share) || share <= 0 || share > 100) {
      Alert.alert('Error', 'Share percentage must be between 0 and 100');
      return false;
    }

    const totalShare = nominees.reduce((sum, nominee) => {
      return sum + parseFloat(nominee.sharePercentage);
    }, 0);

    if (!editingId && totalShare + share > 100) {
      Alert.alert('Error', 'Total share percentage cannot exceed 100%');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingId) {
      // Update existing nominee
      setNominees(nominees.map(nominee =>
        nominee.id === editingId ? { ...formData, id: editingId } : nominee
      ));
      setEditingId(null);
    } else {
      // Add new nominee
      const newNominee: Nominee = {
        ...formData,
        id: Date.now().toString(),
      };
      setNominees([...nominees, newNominee]);
    }

    setFormData(initialFormData);
    Alert.alert('Success', `Nominee ${editingId ? 'updated' : 'added'} successfully`);
  };

  const handleEdit = (nominee: Nominee) => {
    setFormData(nominee);
    setEditingId(nominee.id);
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to remove this nominee?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setNominees(nominees.filter(nominee => nominee.id !== id));
            Alert.alert('Success', 'Nominee removed successfully');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.headerText}>Manage Nominees</Text>

          {/* Nominee Form */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {editingId ? 'Edit Nominee' : 'Add New Nominee'}
            </Text>
            
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.relationship}
                style={styles.picker}
                onValueChange={(value) => setFormData({ ...formData, relationship: value })}
              >
                <Picker.Item label="Select Relationship" value="" />
                <Picker.Item label="Spouse" value="Spouse" />
                <Picker.Item label="Child" value="Child" />
                <Picker.Item label="Parent" value="Parent" />
                <Picker.Item label="Sibling" value="Sibling" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (YYYY-MM-DD)"
              value={formData.dateOfBirth}
              onChangeText={(text) => setFormData({ ...formData, dateOfBirth: text })}
            />

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
              keyboardType="phone-pad"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Address"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              multiline
              numberOfLines={3}
            />

            <TextInput
              style={styles.input}
              placeholder="Share Percentage"
              value={formData.sharePercentage}
              onChangeText={(text) => setFormData({ ...formData, sharePercentage: text })}
              keyboardType="numeric"
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {editingId ? 'Update Nominee' : 'Add Nominee'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Nominees List */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Nominees List</Text>
            {nominees.map((nominee) => (
              <View key={nominee.id} style={styles.nomineeItem}>
                <View style={styles.nomineeHeader}>
                  <Text style={styles.nomineeName}>{nominee.name}</Text>
                  <Text style={styles.nomineeShare}>{nominee.sharePercentage}%</Text>
                </View>
                
                <Text style={styles.nomineeInfo}>
                  Relationship: {nominee.relationship}
                </Text>
                <Text style={styles.nomineeInfo}>
                  Date of Birth: {nominee.dateOfBirth}
                </Text>
                <Text style={styles.nomineeInfo}>
                  Phone: {nominee.phoneNumber}
                </Text>
                <Text style={styles.nomineeInfo}>
                  Address: {nominee.address}
                </Text>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={() => handleEdit(nominee)}
                  >
                    <Text style={styles.actionButtonText}>Edit</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(nominee.id)}
                  >
                    <Text style={styles.actionButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nomineeItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  nomineeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nomineeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  nomineeShare: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  nomineeInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NomineePage;