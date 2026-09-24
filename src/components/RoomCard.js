import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

export default function RoomCard({ room, onPress }) {
  const isAvailable = room.status === 'available';

  return (
    <TouchableOpacity 
      onPress={onPress}
      disabled={!isAvailable}
      activeOpacity={0.7}
      style={styles.cardWrapper}
    >
      <BlurView intensity={50} tint="dark" style={[styles.cardBlur, isAvailable ? styles.borderAvailable : styles.borderOccupied]}>
        <View style={styles.cardHeader}>
          <View style={styles.titleContainer}>
            <Ionicons 
              name={room.name.includes('Lab') ? 'cube-outline' : 'map-outline'} 
              size={26} 
              color={isAvailable ? '#00ffcc' : 'rgba(255,255,255,0.3)'} 
            />
            <Text style={[styles.title, !isAvailable && styles.titleOccupied]}>{room.name}</Text>
          </View>
          <View style={[styles.statusBadge, isAvailable ? styles.bgAvailable : styles.bgOccupied]}>
            <Text style={[styles.statusText, isAvailable ? styles.textAvailable : styles.textOccupied]}>
              {isAvailable ? 'SYNCED' : 'OFFLINE'}
            </Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.infoRow}>
            <Ionicons name="battery-half" size={16} color={isAvailable ? "#00ffcc" : "rgba(255,255,255,0.4)"} />
            <Text style={[styles.subtitle, !isAvailable && styles.textOccupied]}>Capacity: {room.capacity}</Text>
          </View>
          
          {!isAvailable && room.bookedBy && (
            <View style={styles.infoRow}>
              <Ionicons name="warning-outline" size={16} color="#ff00cc" />
              <Text style={styles.subtitleOccupied}>Occupied by <Text style={styles.bold}>{room.bookedBy}</Text></Text>
            </View>
          )}
        </View>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardBlur: {
    padding: 20,
    borderWidth: 1.5,
  },
  borderAvailable: {
    borderColor: 'rgba(0, 255, 204, 0.4)',
  },
  borderOccupied: {
    borderColor: 'rgba(255, 0, 204, 0.2)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 10,
    letterSpacing: 1,
  },
  titleOccupied: {
    color: 'rgba(255,255,255,0.4)',
  },
  cardBody: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  subtitleOccupied: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginLeft: 8,
  },
  textOccupied: {
    color: 'rgba(255,255,255,0.4)',
  },
  bold: {
    fontWeight: 'bold',
    color: '#ff00cc',
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  bgAvailable: {
    backgroundColor: 'rgba(0,255,204,0.1)',
    borderColor: '#00ffcc',
  },
  bgOccupied: {
    backgroundColor: 'rgba(255,0,204,0.1)',
    borderColor: '#ff00cc',
  },
  textAvailable: {
    color: '#00ffcc',
  },
  textOccupied: {
    color: '#ff00cc',
  },
  statusText: {
    fontWeight: '900',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
});
