import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default{
  backgroundImageLogin: {
    flex:1,
   	position: 'absolute', 
    resizeMode: 'cover',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  calendar: {
    marginBottom: 5
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f68002',
    fontSize: 16,
    color: 'white'
  },
  spinnerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  spinnerTextStyle: {
      color: '#FFF'
  },
  spinnerBackground: {
      flex: 1,
      width: null,
      height: deviceHeight,
      backgroundColor: "rgba(0,0,0,0.1)"
  },
};
