import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import FlatListSlider from '../components/CustomSlider/FlatListSlider';
import CustomButton from '../components/Button/CustomButton';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomCarousel from './SubscribeComponent';
import {Divider} from 'react-native-elements';
import Header from '../components/Header';
import {useState} from 'react';

const {width, height} = Dimensions.get('window');

const SubscribePlan = () => {
  const reducer = useSelector(state => state.globalStore);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView>
        <Header headerText={'Subscriprion Booking'} />
        <View style={styles.CarImageContainer}>
          <Image
            style={styles.CarImage}
            source={{
              uri: reducer.LoggedInUserData.carDetails.VehicleImage[0].carImage,
            }}
          />
          <Text style={styles.amountTextPerMonth}>
            {reducer.LoggedInUserData.carDetails.VehicleNumber}
          </Text>
        </View>
        <View style={styles.SwipeContainer}>
          <View style={styles.SwipeSubContainer}>
            <Ionicons
              style={styles.Icon}
              name="arrow-back-outline"
              size={15}
              color={'#000'}
            />
            <Text style={styles.SwipeText}>Swipe Left</Text>
          </View>
          <View style={styles.SwipeSubContainer}>
            <Text style={styles.SwipeText}>Swipe Right</Text>
            <Ionicons
              style={styles.Icon}
              name="arrow-forward-outline"
              size={15}
              color={'#000'}
            />
          </View>
        </View>
        <CustomCarousel />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscribePlan;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#fff',
    height: height - 50,
  },
  PriceContainer: {
    flexDirection: 'row',
  },
  MaindescContainer: {
    borderRadius: 20,

    width: width - 10,
    alignSelf: 'center',
    paddingVertical: 20,
  },
  Icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '400',
    paddingHorizontal: 5,
  },
  CarImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  CarImageContainer: {
    width: width - 60,
    height: height / 4.5,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#c9c9c9c9',
    backgroundColor: '#f0f0f0c9',
    shadowOffset: {
      width: 14,
      height: 24,
    },
    marginTop: 30,
  },

  dailyText: {
    color: '#6c6c6c',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    fontFamily: 'MPLUSRounded1c-Bold',
  },
  amountTextContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  amountText: {
    color: '#2c65e0',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '900',
    fontFamily: 'MPLUSRounded1c-Bold',
    textAlignVertical: 'center',
  },
  amountTextPerMonth: {
    color: '#2c65e0',
    fontSize: 20,
    fontWeight: '900',
    fontFamily: 'MPLUSRounded1c-Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  packageDescTitle: {
    color: '#6c6c6c',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '900',
    fontFamily: 'MPLUSRounded1c-Bold',
    marginTop: 30,
    marginBottom: 20,
  },
  packageDescItem: {
    color: '#6c6c6c',
    textAlign: 'left',
    fontSize: 17,
    fontWeight: '900',
    fontFamily: 'MPLUSRounded1c-Bold',
    padding: 5,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
  descContainer: {
    width: width - 10,
  },
  SwipeContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  SwipeSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SwipeText: {
    fontSize: 14,
    color: '#000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
