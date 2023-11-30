import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UserEditScreen from './UserEditScreen';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../components/Button/CustomButton';
import {useSelector} from 'react-redux';
import {isEmpty} from '../../utilities/utils';

const {width, height} = Dimensions.get('window');

const ProfileScreen = () => {
  const [noAddress] = useState(false);
  const navigation = useNavigation();
  const route = useSelector(state => state.globalStore.LoggedInUserData);
  const handleGoBack = () => {
    navigation.goBack();
  };

  function handleNav() {
    StatusBar.setBarStyle('dark-content');
    navigation.navigate('AddAddress');
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.ImageStyle}
        source={require('../../assets/Carousel/radiant.png')}
      />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <AntDesign style={{top: 5}} name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.editButton}>
          <UserEditScreen />
        </View>
      </View>
      <View style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: route?.photoURL,
          }}
        />
      </View>
      <View style={styles.DetailsContainer}>
        <View style={styles.userDataField}>
          <FontAwesome5
            style={{top: 5}}
            name="user"
            color="#000000"
            size={height * 0.023}
            solid
          />
          <View style={styles.details}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.dataField}>{route?.displayName}</Text>
          </View>
        </View>
        <View style={styles.userDataField}>
          <FontAwesome5
            style={{top: 5}}
            name="phone-alt"
            color="#000000"
            size={height * 0.023}
            solid
          />
          <View style={styles.details}>
            <Text style={styles.label}>Phone number</Text>
            <Text style={styles.dataField}>
              {isEmpty(route?.mobileNumber)
                ? 'Click on edit to add phone number'
                : route?.mobileNumber}
            </Text>
          </View>
        </View>
        <View style={styles.userDataField}>
          <FontAwesome5 name="envelope" color="#000000" size={20} solid />
          <View style={styles.details}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.dataField}>
              {}
              {isEmpty(route?.email)
                ? 'Click on edit to add Email'
                : route?.email}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNav} style={styles.userDataField}>
          <FontAwesome5 name="envelope" color="#000000" size={20} solid />
          <View style={styles.details}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.dataField}>
              {}
              {isEmpty(route?.Address)
                ? 'Click Here to add address'
                : route?.Address?.address}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.privacyPolicyContainer}>
          <Text style={styles.privacyPolicyText}>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, animport from '@react-native-firebase/firestore'; d
            safeguard your personal information, including your address. By
            using our app or services, you consent to the practices described in
            this Privacy Policy.
          </Text>
        </View>
        <View style={styles.Divider}>
          <CustomButton title={'Service History'} />
        </View>

        <CustomButton title={'Selected package'} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fd',
  },
  DetailsContainer: {
    width: width,
    height: height,
    top: -(height / 2.3),
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 12,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
    top: -height / 2.898,
    marginBottom: 40,
  },
  backButton: {
    borderRadius: 70,
    width: 40,
    height: 40,
    borderColor: '#fff',
    alignSelf: 'flex-start',
  },
  profileText: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  Details: {
    color: '#000',
    fontSize: width * 0.045,
    fontWeight: '500',
    marginHorizontal: width * 0.03,
    paddingVertical: width * 0.03,
    borderBottomWidth: 0.5,
    marginBottom: width * 0.03,
  },
  profilePictureContainer: {
    borderWidth: 3,
    width: height * 0.2,
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 200,
    borderColor: '#fff',
    marginTop: height * 0.05,
    top: -height * 0.485,
  },
  profilePicture: {
    borderRadius: 75,
    width: width / 3.1,
    height: width / 3.1,
  },
  AddAddressTextContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  AddAddressContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    padding: 10,
    width: width / 2.5,
    height: width * 0.12,
  },
  AddressIcon: {
    alignSelf: 'center',
    fontSize: width * 0.05,
  },
  AddAddressText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    marginHorizontal: 1,
  },
  ImageStyle: {
    width: width,
    height: height * 0.35,
  },
  privacyPolicyContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: width * 0.02,
  },
  privacyPolicyText: {
    color: '#000',
    marginLeft: 25,
    marginRight: 25,
    padding: 5,
    paddingLeft: 4,
    borderBottomColor: '#ded8d7',
    borderBottomWidth: 1.2,
    fontWeight: '700',
  },
  Divider: {
    paddingVertical: 20,
  },
  userDataField: {
    margin: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    flexDirection: 'column',
    width: width - 50,
  },
  label: {
    color: '#000',
    marginLeft: 26,
    marginBottom: 2,
    fontFamily: 'AlongSansExtraBold',
    fontWeight: '400',
  },
  dataField: {
    color: '#000',
    marginLeft: 25,
    marginRight: 25,
    padding: 5,
    paddingLeft: 4,
    borderBottomColor: '#ded8d7',
    borderBottomWidth: 1.2,
    fontWeight: '700',
  },
  title: {
    fontWeight: '700',
    fontSize: 35,
    paddingBottom: 3,
    marginHorizontal: 5,
    color: '#000',
  },
});

export default ProfileScreen;
