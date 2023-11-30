import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import CustomButton from '../components/Button/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {sendPushNotfication} from './BookingListener';
import {updateUserData} from '../Auth/AuthProvider';
import CalanderModal from './CalanderModal';
import {bookingModalReducer} from '../../hooks/Slice';
import _ from 'lodash';

const {width, height} = Dimensions.get('window');

const Booking = () => {
  const navigation = useNavigation();
  const reducer = useSelector(state => state.globalStore);
  const [open, setOpen] = useState(false);
  const [mondayDate, setmondayDate] = useState([
    '2023-09-04',
    '2023-09-11',
    '2023-09-18',
    '2023-09-25',
  ]);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(state => state.globalStore.LoggedInUserData);
  const [value, setValue] = useState([]);
  const [Frequencyopen, setFrequencyOpen] = useState(false);
  const [Frequencyvalue, setFrequencyValue] = useState(
    reducer?.selectedPlan.toLowerCase(),
  );

  const [items, setItems] = useState([
    {label: 'Basic  Internal Clean', value: 'Basic  Internal Clean'},
    {label: 'Fabric Polish', value: 'Fabric Polish'},
    {label: 'Vaccume Cleaning', value: 'Vaccume Cleaning'},
  ]);
  const [Frequencyitems, setFrequencyItems] = useState([
    {label: 'Daily', value: 'daily'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Monthly', value: 'monthly'},
  ]);
  const modalView = useSelector(state => state.globalStore.bookingModal);
  const [address, setAddress] = useState('');

  const performAsyncAction = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(50);

    if (modalView.status) {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.5)');
      }
    } else {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
      }
    }
  };

  useEffect(() => {
    performAsyncAction();
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, [modalView.status]);

  useEffect(() => {
    setmondayDate(disableMondaysForYear(2023));
    console.log('Entering');
    validateAddress(loggedInUser);
  }, []);

  const disableMondaysForYear = year => {
    const disabledDays = [];

    // Calculate the date of the first Monday in January
    const firstDayOfYear = new Date(year, 0, 1); // January is month 0
    const dayOfWeek = firstDayOfYear.getDay(); // 0 (Sunday) to 6 (Saturday)
    const daysUntilMonday = dayOfWeek === 1 ? 0 : 8 - dayOfWeek;
    const firstMonday = new Date(year, 0, daysUntilMonday + 1);

    // Loop through the year, adding 7 days to each Monday to find all Mondays
    const currentMonday = firstMonday;
    while (currentMonday.getFullYear() === year) {
      const dateString = `${year}-${currentMonday.getMonth() < 9 ? '0' : ''}${
        currentMonday.getMonth() + 1
      }-${currentMonday.getDate() < 10 ? '0' : ''}${currentMonday.getDate()}`;
      disabledDays.push(dateString);
      currentMonday.setDate(currentMonday.getDate() + 7); // Add 7 days to find the next Monday
    }

    // Create the object with disabled dates
    const additionalMarkedDates = Object.fromEntries(
      disabledDays.map(dateString => [dateString, {disabled: true}]),
    );

    return additionalMarkedDates;
  };

  const handleSelectedAddress = () => {
    navigation.navigate('AddAddress');
  };

  const showDatePicker = () => {
    console.log('WORKING');
    dispatch(
      bookingModalReducer({
        status: true,
        dateSelected: {},
      }),
    );
  };

  const handleGetStarted = async () => {
    const usersList = await firestore()
      .collection('Users')
      .where('isAdmin', '==', true)
      .get();

    await firestore()
      .collection('Bookings')
      .add({
        AddOnService: value,
        Address: reducer.LoggedInUserData?.address,
        Coordinates: reducer.LoggedInUserData?.address.coordinates,
        BookingDate: new Date().toString(),
        CarType: reducer.LoggedInUserData.carDetails,
        CurrentScheduledDate: modalView.dateSelected,
        Frequency: Frequencyvalue,
        FutureScheduledDate: modalView.dateSelected,
        OriginalPrice: 10,
        Price: 230,
        StartsFrom: modalView.dateSelected,
        Status: 'Active',
        UserEmail: reducer.LoggedInUserData.emailId,
        DisplayName: reducer.LoggedInUserData.displayName,
      })
      .then(async res => {
        await firestore()
          .collection('Users')
          .doc(reducer.LoggedInUserData.uid)
          .update({
            lastBookingDate: new Date(),
          });
        sendPushNotfication(
          reducer.LoggedInUserData.emailId,
          new Date(),
          usersList,
        );
        navigation.navigate('SubscribeSuccess');
      });
  };

  const AddOnServiceOpen = () => {
    setFrequencyOpen(false);
  };

  const FrequencyOpen = () => {
    setOpen(false);
  };

  const validateAddress = async loggedInUserProp => {
    let tempAdd = '';
    console.log('loggedInUserProp', loggedInUserProp);
    if (loggedInUserProp?.address === undefined) {
      tempAdd = '+ No address found click here to add one.';
      setAddress(tempAdd);
    } else {
      tempAdd = await loggedInUserProp.address.address;
      tempAdd +=
        (await loggedInUserProp.address.parkingLocation) === 'N/A'
          ? ''
          : ` - ${loggedInUserProp.address.parkingLocation}`;
      tempAdd +=
        (await loggedInUserProp.address.parkingNumber) === 'N/A'
          ? ''
          : ` - ${loggedInUserProp.address.parkingNumber}`;
      setAddress(tempAdd);
    }
  };

  return (
    <View style={styles.container}>
      <Header headerText={'Subscriprion Booking'} />
      <Text style={styles.LableText}>Add on services</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        multiple={true}
        placeholder="Select a service"
        mode="BADGE"
        style={styles.DropDownStyle}
        textStyle={styles.textColor}
        extendableBadgeContainer={true}
        placeholderStyle={styles.placeHolderText}
        zIndex={12}
        ArrowDownIconComponent={() => (
          <EvilIcons
            onPress={() => {
              AddOnServiceOpen();
              setOpen(true);
            }}
            style={styles.Icon}
            name="chevron-down"
            size={30}
            color={'#2c65e0'}
          />
        )}
        ArrowUpIconComponent={() => (
          <EvilIcons
            onPress={() => {
              AddOnServiceOpen();
              setOpen(false);
            }}
            style={styles.Icon}
            name="chevron-up"
            size={30}
            color={'#2c65e0'}
          />
        )}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        renderBadgeItem={item => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => +item.value}
              style={styles.ItemContainer}>
              <MaterialIcons
                style={styles.Icon}
                name="cancel"
                size={15}
                color={'#2c65e0'}
              />
              <Text style={styles.ItemText}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Text style={styles.LableText}>Add an Address*</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleSelectedAddress}
        style={styles.selectDataContainer}>
        <Text style={styles.input}>{address}</Text>
      </TouchableOpacity>
      <Text style={styles.LableText}>Frequency*</Text>
      <DropDownPicker
        open={Frequencyopen}
        value={Frequencyvalue}
        items={Frequencyitems}
        setOpen={setFrequencyOpen}
        setValue={setFrequencyValue}
        setItems={setFrequencyItems}
        placeholder="Select an option"
        mode="BADGE"
        style={styles.DropDownStyle}
        zIndex={10}
        textStyle={styles.textColor}
        extendableBadgeContainer={true}
        placeholderStyle={styles.placeHolderText}
        ArrowDownIconComponent={() => (
          <EvilIcons
            onPress={() => {
              FrequencyOpen();
              setFrequencyOpen(true);
            }}
            style={styles.Icon}
            name="chevron-down"
            size={30}
            color={'#2c65e0'}
          />
        )}
        ArrowUpIconComponent={() => (
          <EvilIcons
            onPress={() => {
              FrequencyOpen();
              setFrequencyOpen(false);
            }}
            style={styles.Icon}
            name="chevron-up"
            size={30}
            color={'#2c65e0'}
          />
        )}
        dropDownContainerStyle={styles.dropDownContainerStyle}
      />
      <Text style={styles.LableText}>Starts From*</Text>
      <TouchableOpacity
        onPress={showDatePicker}
        style={styles.selectDataContainer}>
        <TextInput
          placeholder="Click here to select the date"
          placeholderTextColor={'#000'}
          style={styles.input}
          editable={false}
          value={modalView.dateSelected.dateString}
          underlineColorAndroid="transparent"
        />
      </TouchableOpacity>
      {modalView && <CalanderModal mondayDate={mondayDate} />}
      <View style={styles.MainPriceContainer}>
        <View style={styles.SelectedCarContainer}>
          <Image
            style={styles.Image}
            source={{
              uri: reducer.LoggedInUserData.carDetails.VehicleImage[0].carImage,
            }}
          />
          <View style={styles.SelectedCarContainerDetails}>
            <View style={styles.CarNameDetails}>
              <Text style={styles.Price}>
                {reducer.LoggedInUserData.carDetails.VehicleBrand}
              </Text>
              <Text style={styles.GstText}>
                {reducer.LoggedInUserData.carDetails.VehicleNumber}
              </Text>
            </View>
            <View style={styles.PriceContainer}>
              <Text style={styles.StrikePrice}>1799</Text>
              <Text style={styles.Price}>1599</Text>
              <Text style={styles.PricePerMonth}>/- Per Month</Text>
            </View>
            <Text style={styles.GstText}>(Including Gst)</Text>
          </View>
        </View>
      </View>
      <View style={{top: -height * 0.055}}>
        <CustomButton
          onPress={() => handleGetStarted()}
          title={'Get Started'}
          customWidth={width - 30}
        />
      </View>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
  },
  DropDownStyle: {
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderColor: '#a8a8a8',
  },
  ItemContainer: {
    alignItems: 'center',
    backgroundColor: '#e0e0e0d8',
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background with 0.5 opacity
    height: height,
  },
  ItemText: {
    color: '#000',
    paddingHorizontal: 15,
    fontWeight: '500',
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    elevation: 10,
    backgroundColor: '#fff',
  },
  textColor: {
    color: '#000',
  },
  placeHolderText: {color: '#a8a8a8'},
  LableText: {
    color: '#000',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 15,
    paddingVertical: 5,
    marginTop: 20,
    fontWeight: '500',
  },
  AddrssListItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  NoAddrssListItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 20,
  },
  input: {
    width: width - 30,
    borderBottomWidth: 1,
    borderColor: '#a8a8a8',
    color: '#000',
    fontWeight: '700',
    left: 8,
  },
  MainPriceContainer: {
    width: width - 50,
    height: 'auto',
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#c9c9c9c9',
    backgroundColor: '#f0f0f0c9',
    top: -height * 0.08,
    paddingVertical: 20,
  },
  DailyPackage: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  StrikePrice: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '600',
    textDecorationLine: 'line-through',
    top: 2,
  },
  PriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  Price: {
    fontSize: height * 0.028,
    color: '#2c65e0',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '800',
    marginVertical: 10,
  },
  PricePerMonth: {
    fontSize: height * 0.018,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '500',
  },
  GstText: {
    fontSize: height * 0.0153,
    color: '#000',
    textAlign: 'center',
    textAlignVertical: 'bottom',
    fontWeight: '400',
    top: -10,
    marginBottom: 20,
  },
  Image: {
    width: '50%',
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
  SelectedCarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  SelectedCarContainerDetails: {
    height: height * 0.16,
  },
  CarNameDetails: {
    justifyContent: 'space-evenly',
  },
});
