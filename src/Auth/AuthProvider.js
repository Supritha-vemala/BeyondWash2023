import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginReducerUpdate} from '../../hooks/Slice';
import PushNotification from 'react-native-push-notification';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

let deviceToken = '';

// const checkLoginCacheExists = async authUser => {
//   try {
//     // Get the timestamp of the last splash screen display

//     if (lastSplashTimestamp) {
//       // If a timestamp exists, compare it with the current time
//       const currentTime = new Date().getTime()
//       const oneDay = 24 * 60 * 60 * 1000 // One day in milliseconds

//       if (currentTime - parseInt(lastSplashTimestamp) < oneDay) {
//         // If less than 5 seconds have passed, don't show the splash screen
//         setShowSplash(false)
//       } else {
//         // If more than 5 seconds have passed, show the splash screen again
//         await AsyncStorage.setItem('@last_login_timestamp', currentTime.toString()) // Update the timestamp
//         setShowSplash(true)
//       }
//     } else {
//       // If there's no timestamp, show the splash screen for the first time
//       await AsyncStorage.setItem('@last_login_timestamp', new Date().getTime().toString()) // Set the initial timestamp
//       setShowSplash(true)
//     }
//   } catch (error) {
//     console.error('Error reading or writing to AsyncStorage:', error)
//   }
// }

export const SignInOnNoCache = async dispatch => {
  try {
    const lastLoginTimestamp = await AsyncStorage.getItem(
      '@last_login_timestamp',
    );
    const parsedData = JSON.parse(lastLoginTimestamp);
    if (lastLoginTimestamp !== null) {
      // If a timestamp exists, compare it with the current time
      const currentTime = new Date().getTime();
      const oneDay = 6 * 30 * 24 * 60 * 60 * 1000;
      if (currentTime - parseInt(parsedData.userDetails.signUpTime) < oneDay) {
        // If less than 5 seconds have passed, don't show the splash screen
        dispatch(LoginReducerUpdate(parsedData));
        return 1;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'SignInOnNoCache!',
      text2: error,
      visibilityTime: 5000,
      style: {
        backgroundColor: 'red',
      },
    });
  }
};

export const login = async (email, password, dispatch) => {
  try {
    const loginData = await auth().signInWithEmailAndPassword(email, password);
    const userDocRef = firestore().collection('Users').doc(loginData.user.uid);
    const userSnapshot = await userDocRef.get();
    const userData = {
      userDetails: {
        displayName: userSnapshot._data.displayName,
        profilePicture: userSnapshot._data.photoURL,
        emailId: loginData.user.email,
        uid: loginData.user.uid,
        deviceToken,
        signUpTime: new Date().getTime().toString(),
        address: userSnapshot._data.address,
        isAdmin: userSnapshot._data.isAdmin,
        isEmployee: userSnapshot._data.isEmployee,
        assignedBookings: userSnapshot._data.assignedBookings,
      },
      isAuthenticated: true,
    };
    await PushNotification.configure({
      onRegister: async function (token) {
        await firestore().collection('Users').doc(loginData.user.uid).update({
          deviceToken: token.token,
        });
      },
    });

    await AsyncStorage.setItem(
      '@last_login_timestamp',
      JSON.stringify(userData),
    ); // Set the initial timestamp

    dispatch(LoginReducerUpdate(userData));
  } catch (e) {
    Toast.show({
      type: 'error',
      text1: 'That email address is already in use!',
      text2: e,
      visibilityTime: 5000,
      style: {
        backgroundColor: 'red',
      },
    });
  }
};

export const updateUserData = async (userUID, updatedData, profile) => {
  try {
    const userDocRef = firestore().collection('Users').doc(userUID);
    await userDocRef.set(updatedData);
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error updating user profile!',
      text2: error,
      visibilityTime: 5000,
      style: {
        backgroundColor: 'red',
      },
    });
  }
};

export const signup = async (
  email,
  password,
  userName,
  mobileNum,
  dispatch,
) => {
  try {
    // Create the user with email and password
    const authUser = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    let userData;
    await PushNotification.configure({
      onRegister: function (token) {
        deviceToken = token;
        userData = {
          userDetails: {
            emailId: authUser.user.email,
            signUpTime: new Date().getTime().toString(),
            deviceToken: token.token,
            displayName: userName,
            photoURL:
              'https://lumiere-a.akamaihd.net/v1/images/h_blackpanther_mobile_19754_57fe2288.jpeg?region=0,0,640,480',
            address: 'address',
            mobileNumber: mobileNum,
            isAdmin: false,
            isEmployee: false,
            uid: authUser.user.uid,
            assignedBookings: [],
          },
          isAuthenticated: true,
        };
        updateUserData(
          authUser.user.uid,
          {
            deviceToken: token.token,
            displayName: userName,
            photoURL:
              'https://lumiere-a.akamaihd.net/v1/images/h_blackpanther_mobile_19754_57fe2288.jpeg?region=0,0,640,480',
            address: 'address',
            mobileNumber: mobileNum,
            isAdmin: false,
            isEmployee: false,
            uid: authUser.user.uid,
            assignedBookings: [],
            email: email,
          },
          false,
        );
      },
    });

    await AsyncStorage.setItem(
      '@last_login_timestamp',
      JSON.stringify(userData),
    ); // Set the initial timestamp

    dispatch(LoginReducerUpdate(userData));
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Signup error!',
      text2: `${error}`,
      visibilityTime: 5000,
      style: {
        backgroundColor: 'red',
      },
    });
  }
};
