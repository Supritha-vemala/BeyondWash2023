import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Animation from '../components/Animation';

const { width, height } = Dimensions.get('window');

const ContactDetails = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState();
  const [contactData, setContactData] = useState([]);

  let obj = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  useEffect(() => {
    setLoading(true);
    firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        setLoading(false);
        setContactData(
          querySnapshot.docs.map(doc =>
            Object.assign(doc.data(), {
              id: doc.id
            })
          )
        );
      });
  }, []);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('ProfileScreen', {
            item: item
          })
        }
      >
        <View style={styles.ContactContainer}>
          <View style={styles.contactContainer}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.photoURL
              }}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.nameText}>{item.displayName}</Text>
            <Text style={styles.detailsText}>
              {item.mobileNumber} | {item.email}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Header headerText={'User List'} />
      {loading ? <Animation /> : <FlatList style={styles.renderItem} data={contactData} renderItem={renderItem} />}
    </View>
  );
};

export default ContactDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  textContact: {
    marginHoroizontal: 24,
    fontSize: 18,
    fontWeight: 'bold'
  },
  textContac2t: {
    fontSize: 18,
    color: 'red'
  },
  ContactContainer: {
    backgroundColor: '#fff',
    width: '97%',
    height: height / 11,
    marginVertical: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 40,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    elevation: 15,
    shadowColor: '#adadadc9'
    // opacity: 0.1,
  },
  contactContainer: {
    flexDirection: 'row',
    width: '20%',
    // alignContent: "flex-star",
    justifyContent: 'flex-end',
    paddingLeft: 10
    // backgroundColor: "white",
  },
  tinyLogo: {
    width: width / 7.5,
    height: width / 7.5,
    borderRadius: 80,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  ImageContainer: {
    width: width / 12,
    height: width / 12,
    // borderWidth: 2,
    padding: 10
  },
  detailsContainer: {
    width: '80%',
    alignSelf: 'center',
    height: '70%',
    marginHorizontal: 15,
    // backgroundColor: "white",
    // alignItems:'center',
    justifyContent: 'center'
  },
  nameText: {
    fontSize: 13,
    fontWeight: '800',
    // paddingVertical: 3,
    color: '#000'
  },
  detailsText: {
    fontSize: 12,
    fontWeight: '500',
    // paddingVertical: 3,
    color: '#000'
  },
  renderItem: {
    height: '80%'
  },
  InputBox: {
    width: width - 50,
    alignItems: 'center',
    borderWidth: 0.3,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderColor: '#a8a8a8',
    paddingHorizontal: 15,
    color: '#000'
  }
});
