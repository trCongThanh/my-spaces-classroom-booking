import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { RoomContext } from '../context/RoomContext';

export default function BookingScreen({ route, navigation }) {
  const { room } = route.params;
  const { bookRoom } = useContext(RoomContext);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBooking = () => {
    if (!userName.trim()) {
      Alert.alert("Error", "Required parameter missing.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      bookRoom(room.id, userName);
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <BlurView intensity={70} tint="dark" style={styles.modalOverlay}>
        <TouchableOpacity style={styles.closeArea} onPress={() => navigation.goBack()} />
        
        <View style={styles.cyberModal}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={32} color="#00ffcc" />
          </TouchableOpacity>

          <View style={styles.iconWrapper}>
            <Ionicons name="finger-print-outline" size={50} color="#00ffcc" />
          </View>
          <Text style={styles.headerTitle}>INITIALIZE BOOKING</Text>
          <Text style={styles.headerSubtitle}>Authenticate to claim this node</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>{room.name}</Text>
            <Text style={styles.infoValue}>Max Capacity: {room.capacity}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="scan-outline" size={20} color="#00ffcc" style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="ENTER USER ID"
              placeholderTextColor="rgba(0,255,204,0.4)"
              value={userName}
              onChangeText={setUserName}
              editable={!loading}
              autoFocus
            />
          </View>

          <TouchableOpacity 
            onPress={handleBooking} 
            disabled={loading}
            activeOpacity={0.8}
            style={styles.submitButton}
          >
            {loading ? (
              <ActivityIndicator color="#050510" />
            ) : (
              <Text style={styles.submitButtonText}>EXECUTE</Text>
            )}
          </TouchableOpacity>
        </View>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  closeArea: {
    ...StyleSheet.absoluteFillObject,
  },
  cyberModal: {
    backgroundColor: 'rgba(5, 5, 16, 0.8)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 2,
    borderColor: '#00ffcc',
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoCard: {
    backgroundColor: 'rgba(0,255,204,0.1)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#00ffcc',
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 4,
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 12,
    color: '#00ffcc',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,255,204,0.5)',
    paddingHorizontal: 16,
    marginBottom: 30,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 14,
    color: '#00ffcc',
    fontWeight: 'bold',
    letterSpacing: 1,
    outlineStyle: 'none',
  },
  submitButton: {
    backgroundColor: '#00ffcc',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ffcc',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  submitButtonText: {
    color: '#050510',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  }
});
