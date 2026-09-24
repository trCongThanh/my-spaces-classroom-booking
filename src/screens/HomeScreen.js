import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import HeroCarousel from '../components/HeroCarousel';
import RoomCard from '../components/RoomCard';
import { RoomContext } from '../context/RoomContext';

export default function HomeScreen({ navigation }) {
  const { rooms } = useContext(RoomContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* 1. HERO SLIDER */}
      <HeroCarousel />

      {/* 2. COURSE/NODES GRID */}
      <View style={styles.contentContainer}>
        
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>AVAILABLE NODES</Text>
          <Text style={styles.sectionSubtitle}>Choose a terminal to begin your session</Text>
        </View>

        <View style={styles.gridContainer}>
          {rooms.map(item => (
            <View key={item.id} style={styles.gridItem}>
              <RoomCard 
                room={item} 
                onPress={() => navigation.navigate('Booking', { room: item })} 
              />
            </View>
          ))}
        </View>

      </View>
      
      <View style={{height: 100}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 30,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 255, 204, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#00ffcc',
    marginTop: 8,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20, 
  },
  gridItem: {
    flexGrow: 1,
    flexBasis: 300, 
    maxWidth: 400,
  }
});
