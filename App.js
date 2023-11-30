import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SideBarNavigation from './navigation/SideBarNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import configureStore from './hooks/Store';
import SplashScreen from './src/Home/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        // Get the timestamp of the last splash screen display
        const lastSplashTimestamp = await AsyncStorage.getItem('@last_splash_timestamp');

        if (lastSplashTimestamp) {
          // If a timestamp exists, compare it with the current time
          const currentTime = new Date().getTime();
          const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

          if (currentTime - parseInt(lastSplashTimestamp) < oneDay) {
            // If less than 5 seconds have passed, don't show the splash screen
            setShowSplash(false);
          } else {
            // If more than 5 seconds have passed, show the splash screen again
            await AsyncStorage.setItem('@last_splash_timestamp', currentTime.toString()); // Update the timestamp
            setShowSplash(true);
          }
        } else {
          // If there's no timestamp, show the splash screen for the first time
          await AsyncStorage.setItem('@last_splash_timestamp', new Date().getTime().toString()); // Set the initial timestamp
          setShowSplash(true);
        }
      } catch (error) {
        console.error('Error reading or writing to AsyncStorage:', error);
      }
    };
    const firestoreSettings = {
      areTimestampsInSnapshotsEnabled: true,
      // Other Firestore settings
    };
    
    checkSplashScreen();
  }, []);

  useEffect(() => {
    // After 5 seconds, hide the splash screen
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <SafeAreaProvider>
      <Provider store={configureStore}>
        {showSplash ? (
          <SplashScreen />
        ) : (
          <NavigationContainer>
            <SideBarNavigation />
          </NavigationContainer>
        )}
      </Provider>
      <Toast></Toast>
    </SafeAreaProvider>
  );
};

export default App;
