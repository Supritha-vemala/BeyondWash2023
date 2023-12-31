/* eslint-disable prettier/prettier */
import * as React from 'react';
import { View, Dimensions, Image, StyleSheet, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import CustomButton from '../components/Button/CustomButton';
import { useDispatch } from 'react-redux';
import { selectedPlanType } from '../../hooks/Slice';
import { useNavigation } from '@react-navigation/native';

const PAGE_WIDTH = Dimensions.get('window').width;
const { width, height } = Dimensions.get('window');

const dataItem = [
  {
    packagePlan: 'Daily'
  },
  {
    packagePlan: 'Weekly'
  },
  {
    packagePlan: 'Alternative days'
  }
];

function CustomCarousel() {
  const progressValue = useSharedValue(0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH,
    height: PAGE_WIDTH * 1.6
  };

  const handleClick = packageDetails => {
    dispatch(selectedPlanType(packageDetails));
    navigation.navigate('Booking');
  };

  return (
    <View
      style={{
        elevation: 5
      }}
    >
      <Carousel
        style={styles.CarouselContainer}
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3500}
        onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 80
        }}
        data={dataItem}
        renderItem={index => (
          <View style={styles.container}>
            <Text style={styles.DailyPackage}>{index.item.packagePlan}</Text>
            <View style={styles.PackageDetailsContainer}>
              <View style={styles.PackageDetails}>
                <Image style={styles.Image} source={require('../../assets/images/002-tire.png')} />
                <Text style={styles.InteriorHeading}>Exterior</Text>
                <Text style={styles.InteriorDetails}>Waterless cleaning 6 days/week</Text>
              </View>
              <View style={styles.PackageDetails}>
                <Image style={styles.Image} source={require('../../assets/images/001-window-cleaning.png')} />
                <Text style={styles.InteriorHeading}>Interior</Text>
                <Text style={styles.InteriorDetails}>Vaccume cleaning once a week</Text>
              </View>
            </View>
            <View style={styles.PriceContainer}>
              <Text style={styles.Price}>1599</Text>
              <Text style={styles.PricePerMonth}>/- Per Month</Text>
            </View>
            <Text style={styles.GstText}>(Including Gst)</Text>
            <CustomButton
              onPress={() => handleClick(index.item.packagePlan)}
              title={'Get Started'}
              customWidth={width / 1.8}
            />
          </View>
        )}
      />
    </View>
  );
}

export default CustomCarousel;

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    height: height / 2.2,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#c9c9c9c9',
    backgroundColor: '#f0f0f0c9'
  },
  CarouselContainer: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  DailyPackage: {
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: '800'
  },
  PackageDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center'
  },
  PackageDetails: {
    width: 130,
    height: 120,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    borderRadius: 15,
    borderColor: '#bebebec9',
    padding: 5
  },
  Image: {
    width: 50,
    height: 50
  },
  InteriorHeading: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '500',
    borderBottomWidth: 0.6,
    marginVertical: 5,
    width: '80%'
  },
  InteriorDetails: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  PriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25
  },
  Price: {
    fontSize: 25,
    color: '#2c65e0',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '800'
  },
  PricePerMonth: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '500'
  },
  GstText: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '400',
    top: -10,
    marginBottom: 20
  }
});
