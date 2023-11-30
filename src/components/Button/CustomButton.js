import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

let buttonWidth, buttonHeight;
const CustomButton = ({ title, onPress, customWidth, customHeight }) => {
  buttonWidth = typeof customWidth === 'undefined' ? width - 40 : customWidth;
  buttonHeight = typeof customHeight === 'undefined' ? 'auto' : customHeight;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.button, { width: buttonWidth, height: buttonHeight }]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#2c65e0',
    shadowColor: '#2c65e0',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center'
  }
});

export default CustomButton;
