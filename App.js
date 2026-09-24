import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Platform } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RoomProvider } from './src/context/RoomContext';
import { StatusBar } from 'expo-status-bar';
import ParticleBackground from './src/components/ParticleBackground';

export default function App() {
  const pan = useRef(new Animated.ValueXY({ x: -100, y: -100 })).current;

  const handlePointerMove = (e) => {
    if (Platform.OS !== 'web') return;
    const x = e.nativeEvent.clientX || e.nativeEvent.pageX;
    const y = e.nativeEvent.clientY || e.nativeEvent.pageY;
    
    Animated.spring(pan, {
      toValue: { x, y },
      useNativeDriver: false,
      friction: 6,
      tension: 100,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <RoomProvider>
        <View style={styles.container} onPointerMove={handlePointerMove}>
          <ParticleBackground />
          <View style={styles.overlay} pointerEvents="box-none">
            <StatusBar style="light" />
            <AppNavigator />
          </View>

          {/* Glowing Cursor UI Motion */}
          {Platform.OS === 'web' && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.customCursor,
                {
                  transform: [
                    { translateX: pan.x },
                    { translateY: pan.y },
                    { translateX: -20 },
                    { translateY: -20 }
                  ]
                }
              ]}
            />
          )}
        </View>
      </RoomProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050510',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  customCursor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255,204,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,204,0.6)',
    shadowColor: '#00ffcc',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    zIndex: 9999,
  }
});
