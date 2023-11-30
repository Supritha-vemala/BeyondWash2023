import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import {StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import CustomCarousel from './CustomCarousel';
import SelectCarType from './SelectCarType';
import {useDispatch, useSelector} from 'react-redux';
import {sendPushNotficationWhenAppIsOpen} from '../Booking/BookingListener';
import Employee from './../Employee/Employee';
import {useFocusEffect} from '@react-navigation/native';
import {SelectedCarType} from '../../hooks/Slice';

const {width, height} = Dimensions.get('window');

const NewHomeScreen = () => {
  const navigation = useNavigation();
  const navigationRef = useRef(null);
  const dispatch = useDispatch();
  navigationRef.current = navigation;
  const loggedInUser = useSelector(state => state.globalStore.LoggedInUserData);
  useEffect(() => {
    // const userDocRef = firestore().collection('Users').doc(loggedInUser.uid);
    // const userSnapshot = userDocRef.get();
    // dispatch(LoginReducerUpdate(userSnapshot));
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  }, []);

  const BasicData = [
    {
      id: 1,
      IconName: 'md-timer',
      IconSize: 20,
      Text: 'Takes 30 mins.',
    },
    {
      id: 2,
      IconName: 'md-timer',
      IconSize: 20,
      Text: 'Takes 30 mins.',
    },
    {
      id: 3,
      IconName: 'md-timer',
      IconSize: 20,
      Text: 'Takes 30 mins.',
    },
  ];

  const carSelectedNavigate = () => {
    if (loggedInUser.carDetails === undefined) {
      navigation.navigate('CarDetails');
      dispatch(SelectedCarType(loggedInUser.carDetails));
    } else {
      navigation.navigate('SubscribePlan');
    }
  };

  const handleClick = () => {
    navigation.dispatch(DrawerActions.openDrawer());
    StatusBar.setBarStyle('dark-content');
  };

  const renderListItem = ({item}) => {
    return (
      <View style={styles.MainContentContainer}>
        <View style={styles.ContentContainer}>
          <View style={styles.PackageTypeImageStyleContainer}>
            <Image
              style={styles.PackageTypeImageStyle}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/9343/9343056.png',
              }}
            />
          </View>
          <View style={styles.DetailsContainer}>
            <Text style={styles.BasicText}>Car Wash</Text>
            <Text style={styles.BasicDescription}>
              Complete car exterior cleaning
            </Text>
          </View>
        </View>
        <View style={styles.TimeContainer}>
          <Ionicons
            style={styles.TimeImageStyle}
            name={'md-timer'}
            size={20}
            color={'#2463eb'}
          />
          <Text style={styles.MinutesText}> 30 Mins</Text>
        </View>
        <TouchableOpacity activeOpacity={0.1}>
          <TouchableOpacity
            onPress={carSelectedNavigate}
            activeOpacity={0.9}
            style={styles.buttonContainer}>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonText}>Starting From</Text>
              <Text style={styles.buttonText}>&#x20B9;400/Month</Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      {loggedInUser.isEmployee ? (
        <Employee />
      ) : (
        <>
          <Image
            style={styles.ImageStyle}
            source={require('../../assets/Carousel/radiant.png')}
          />
          <View style={styles.TopContainer}>
            <TouchableOpacity onPress={handleClick}>
              <View style={styles.NotifyContainer}>
                <View style={[styles.IconStyle, {width: width / 18}]} />
                <View
                  style={[styles.IconStyle, {width: width / 23, left: -2}]}
                />
                <View style={[styles.IconStyle, {width: width / 20}]} />
              </View>
            </TouchableOpacity>
            <View style={styles.NameContainer}>
              <Text style={styles.NameText}>
                Hello {loggedInUser.displayName}
              </Text>
              <Text style={styles.WelcomeText}>Welcome Back!</Text>
            </View>
          </View>

          <View style={styles.CarouselContainer}>
            <CustomCarousel />
          </View>
          <View style={styles.PackageSection}>
            <View style={styles.PackageContainer}>
              <Text style={styles.PackageText}>Packages</Text>
              <Text style={styles.BenefitsText}>
                {' '}
                (Get Exclusive & Unlimited Benefits!)
              </Text>
            </View>
            <FlatList
              data={BasicData}
              horizontal={false}
              scrollEnabled={true}
              style={styles.FlatListStyle}
              renderItem={renderListItem}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default NewHomeScreen;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#f5f8fd',
    flex: 1,
  },
  TopContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: -height / 4.2,
    paddingHorizontal: 15,
    padding: 5,
  },
  NotifyContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff10',
  },
  NameContainer: {
    marginTop: 7,
  },
  PackageSection: {
    paddingHorizontal: 18,
    top: -height / 4.5,
    paddingBottom: 10,
  },
  CarouselContainer: {
    top: -height / 5,
    justifyContent: 'center',
    height: height / 4.1,
  },
  MainContentContainer: {
    backgroundColor: '#ffffff',
    width: width - 35,
    alignSelf: 'center',
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    shadowOffset: {width: -1, height: 1},
    shadowColor: 'rgb(155, 155, 155)',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },
  ContentContainer: {
    flexDirection: 'row',
  },
  TimeContainer: {
    width: 80,
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
    justifyContent: 'space-between',
  },
  MainPriceContainer: {
    backgroundColor: '#f1f1f5',
    marginTop: 8,
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ContainerDivider: {
    borderTopWidth: 0.8,
    width: width - width / 8.5,
    alignSelf: 'center',
    borderColor: '#00000056',
  },
  ImageStyle: {
    width: width,
    height: height / 3.5,
    resizeMode: 'cover',
    top: -height / 15,
  },
  PackageTypeImageStyleContainer: {
    width: width / 6.8,
    height: width / 6.8,
    borderRadius: 15,
    backgroundColor: '#f1f1f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PackageTypeImageStyle: {
    width: width / 11,
    height: width / 11,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  PackageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  TimeImageStyle: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  PremiumPackageTypeImageStyle: {
    width: width / 8,
    height: width / 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  NameText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: 19,
    textAlign: 'right',
  },
  WelcomeText: {
    fontWeight: '300',
    color: '#fff',
    fontSize: 14,
    textAlign: 'right',
  },
  MinutesText: {
    color: '#577fd5',
    fontWeight: '700',
    top: 2,
  },
  IconStyle: {
    borderWidth: 0.7,
    borderColor: '#fff',
    marginVertical: 3,
  },
  PackageText: {
    color: '#322e2e',
    fontSize: width / 22,
    fontFamily: 'MPLUSRounded1c-Black',
    paddingVertical: 10,
  },
  DetailsContainer: {
    justifyContent: 'space-around',
    marginHorizontal: 12,
    paddingVertical: 2,
    width: width / 1.78,
  },
  BasicText: {
    color: '#000000ec',
    fontSize: width / 23,
    fontWeight: '800',
  },
  BasicDescription: {
    color: '#00000089',
    fontSize: width / 30,
    fontFamily: 'MPLUSRounded1c-Medium',
  },
  BenifitsText: {
    color: '#00000089',
    fontSize: width / 27,
    fontFamily: 'MPLUSRounded1c-Medium',
    alignSelf: 'center',
    top: 2.5,
  },
  FlatListStyle: {
    height: '55%',
    marginBottom: 50,
  },
  buttonContainer: {
    width: width - 70,
    height: 45,
    marginTop: 5,
    backgroundColor: '#2c65e0',
    borderRadius: 8,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'MPLUSRounded1c-Black',
    fontWeight: '700',
  },
});
