import axios from 'axios';
import {PushNotificationIOS} from 'react-native';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';

export const sendPushNotfication = async (email, date, userList) => {
  sendPushNotficationWhenAppIsClosed(email, date, userList);
};

const sendPushNotficationWhenAppIsClosed = async (email, date, userList) => {
  axios.post(
    'https://us-central1-beyondwash-c2b4f.cloudfunctions.net/sendAdminPushNotification/api/userDetails',
    {
      userEmail: email,
      date,
    },
  );
};
