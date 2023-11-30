import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../components/Button/CustomButton';
import {Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'Customer Care', value: 'Customer Care'},
    {label: 'Expert Cleaner', value: 'Expert Cleaner'},
  ]);

  const handleConfirm = date => {};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Header headerText={'Feedback'} />
      <Image
        style={styles.image}
        source={require('../../assets/images/feedback.png')}
      />
      <View style={styles.DropdownContainer}>
        <Text style={styles.LableText}>Add an Address*</Text>
        <DropDownPicker
          open={open}
          value={value}
          placeholder="Select an address"
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          mode="BADGE"
          style={styles.DropDownStyle}
          zIndex={11}
          textStyle={styles.textColor}
          extendableBadgeContainer={true}
          placeholderStyle={styles.placeHolderText}
          ArrowDownIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-down"
              size={30}
              color={'#2c65e0'}
            />
          )}
          ArrowUpIconComponent={() => (
            <EvilIcons
              style={styles.Icon}
              name="chevron-up"
              size={30}
              color={'#2c65e0'}
            />
          )}
          onSelectItem={handleConfirm}
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />
        <Text style={styles.LableText}>Tell us more details.</Text>
        <TextInput
          style={styles.input}
          placeholder={'Type here...'}
          placeholderTextColor="#AAAAAA"
          multiline
          numberOfLines={7}
        />
        <CustomButton title={'Submit'} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  image: {
    width: width / 1.2,
    height: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'contain',
    top: -70,
  },
  DropDownStyle: {
    borderBottomWidth: 0.3,
    borderLeftWidth: 0.3,
    borderRightWidth: 0.3,
    borderTopWidth: 0.3,
    borderColor: '#a8a8a8',
  },
  LableText: {
    color: '#000',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 15,
    paddingVertical: 15,
    fontWeight: '400',
  },
  DropdownContainer: {
    top: -90,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    elevation: 10,
    backgroundColor: '#fff',
  },
  placeHolderText: {color: '#a8a8a8'},
  textColor: {
    color: '#000',
  },
  input: {
    marginLeft: 10,
    color: '#000',
    fontWeight: '400',
    borderWidth: 0.3,
    borderRadius: 10,
    right: 7,
    width: '98%',
    borderColor: '#a8a8a8',
    marginBottom: 50,
    height: '20%',
    padding: 20,
  },
});
