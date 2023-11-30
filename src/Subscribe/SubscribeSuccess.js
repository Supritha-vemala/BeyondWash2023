import React, {useEffect} from 'react';
import {Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import {Image, Text} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const SubscribeSuccess = () => {
  const navigation = useNavigation();
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
  const onPress = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <View style={styles.successCheck}>
      <Image
        source={require('../../assets/gifs/SuccessfullyDone.gif')}
        style={styles.successIcon}
      />
      <Text style={styles.successText}>{'Success'}</Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.button}>
        <Text style={styles.buttonText}>Return</Text>
      </TouchableOpacity>
      <Image
        style={styles.carImage}
        source={require('../../assets/images/Car_Wash_Daily.png')}
      />
    </View>
  );
};

export default SubscribeSuccess;

const styles = StyleSheet.create({
  successCheck: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    alignSelf: 'center',
    marginTop: 20,
    width: width * 0.63,
    height: height * 0.23,
  },
  successText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    fontSize: 28,
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2c65e0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    shadowColor: '#2c65e0',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    alignSelf: 'center',
    marginTop: 30,
    width: width * 0.43,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  carImage: {
    resizeMode: 'contain',
    width: width * 0.9,
    height: height * 0.4,
    top: height / 50,
    shadowColor: '#2c65e0',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
  },
});
