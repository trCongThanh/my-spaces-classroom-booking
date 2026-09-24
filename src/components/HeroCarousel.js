import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HERO_DATA = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'ROBIN SPACES',
    subtitle: 'THE FUTURE OF WORKSPACES',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'CYBER LABS',
    subtitle: 'NEXT-GEN ENVIRONMENT',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'DEEP FOCUS',
    subtitle: 'ZERO DISTRACTIONS',
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web',
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % HERO_DATA.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: Platform.OS !== 'web',
        }).start();
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  const currentItem = HERO_DATA[currentIndex];

  return (
    <View style={styles.container}>
      <Animated.Image 
        source={{ uri: currentItem.image }} 
        style={[styles.image, { opacity: fadeAnim }]} 
      />
      <View style={styles.overlay}>
        <View style={styles.content}>
           <Text style={styles.subtitle}>{currentItem.subtitle}</Text>
           <Text style={styles.title}>{currentItem.title}</Text>
           <View style={styles.button}>
              <Text style={styles.buttonText}>EXPLORE NODES</Text>
              <Ionicons name="arrow-forward" size={20} color="#050510" />
           </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'web' ? '70vh' : 400,
    width: '100%',
    marginBottom: 50,
    position: 'relative',
    backgroundColor: '#050510',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5,5,16,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    maxWidth: 800,
  },
  subtitle: {
    color: '#00ffcc',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: width > 768 ? 64 : 40,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 40,
    textShadowColor: 'rgba(0, 255, 204, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00ffcc',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#00ffcc',
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#050510',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    marginRight: 8,
  }
});
