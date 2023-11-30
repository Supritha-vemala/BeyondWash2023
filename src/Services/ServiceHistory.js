import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  UIManager,
  LayoutAnimation
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { userBookingsReducer } from '../../hooks/Slice';
import BookingCard from '../components/Booking/BookingCard';

const serviceHistoryDetails = [
  {
    type: 'Basic Wash',
    date: '27-Nov-2022',
    imageUri: 'https://www.pngmart.com/files/22/Sedan-PNG-Clipart.png',
    status: 'pending'
  },
  {
    type: 'Special Wash',
    date: '03-Apr-2023',
    imageUri: 'https://www.pngmart.com/files/22/Sedan-PNG-Clipart.png',
    status: 'done'
  },
  {
    type: 'Basic Wash',
    date: '19-Oct-2022',
    imageUri: 'https://www.pngmart.com/files/22/Kia-Soul-EV-PNG-Image.png',
    status: 'done'
  },
  {
    type: 'Special Wash',
    date: '03-Apr-2023',
    imageUri: 'https://www.pngmart.com/files/22/Sedan-PNG-Clipart.png',
    status: 'done'
  }
];

const { width } = Dimensions.get('window');
const ServiceHistory = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [UserBookings, setUserBookings] = useState([]);
  const accordionContentHeight = useState(new Animated.Value(0))[0];
  const loggedInUser = useSelector(state => state.globalStore.LoggedInUserData);
  const userBookings = useSelector(state => state.globalStore.userBookings);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserBookings(userBookings);
    console.log('UserBookings', UserBookings);
  }, [userBookings]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        if (Object.keys(loggedInUser).length !== 0) {
          const snapshot = await firestore()
            .collection('Bookings')
            .where('UserEmail', '==', loggedInUser.emailId)
            .get();
          const bookings = snapshot.docs.map(doc => doc.data());
          dispatch(userBookingsReducer(bookings));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserBookings();
  }, []);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (isCollapsed) {
      Animated.spring(accordionContentHeight, {
        toValue: 100, // The desired height of the content when expanded
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(accordionContentHeight, {
        toValue: 0,
        duration: 300, // Animation duration in milliseconds
        useNativeDriver: false
      }).start();
    }

    setIsCollapsed(!isCollapsed);
  };
  useEffect(() => {
    performAsyncAction();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);

  const performAsyncAction = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(300);
    StatusBar.setBarStyle('dark-content');
  };
  return (
    <View style={styles.container}>
      <Header headerText={'Service History'} />
      <BookingCard bookingData={UserBookings} employeeData={[]} isAdmin={loggedInUser.isAdmin} loading={false} />
    </View>
  );
};

export default ServiceHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  historyRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 18,
    marginRight: 18,
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#fff',
    marginBottom: 5
  },
  Image: {
    width: width * 0.33,
    height: width * 0.33,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: 20
  },
  infoContainer: {
    paddingLeft: 15
  },
  typeText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontWeight: '700',
    paddingLeft: 20
  },
  doneContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginTop: 2
  },
  doneImage: {
    width: width * 0.05,
    height: width * 0.05,
    resizeMode: 'contain'
  },
  doneText: {
    fontSize: 15,
    textAlign: 'left',
    color: '#118220',
    fontWeight: '700',
    paddingLeft: 3
  },
  pendingContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    marginTop: 2
  },
  pendingImage: {
    width: width * 0.06,
    height: width * 0.06,
    resizeMode: 'contain'
  },
  statusText: {
    fontSize: 15,
    textAlign: 'left',
    color: '#2463eb',
    fontWeight: '700',
    paddingLeft: 3
  },
  dateText: {
    fontSize: 15,
    color: '#8c8b8b',
    textAlign: 'left',
    textAlignVertical: 'bottom',
    fontWeight: '500',
    paddingTop: 3,
    paddingLeft: 20
  },
  header: {
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  content: {
    overflow: 'hidden',
    backgroundColor: 'white',
    padding: 10
  },
  collopsableBox: {
    flexDirection: 'row'
  },
  headContainer: {
    borderColor: '#a8a5a5',
    margin: 5,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#3b3b3b93',
    backgroundColor: '#fff'
  }
});
