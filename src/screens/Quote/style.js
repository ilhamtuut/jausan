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
  containerSlide:{
    width: deviceWidth,
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 5,
    textAlign: 'center',
    justifyContent: 'center'
  },
  bannerSliderImagesWrap :{
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.5,
    margin: 10,
    justifyContent: 'space-between'
  },
  sliderImage : {
    height: deviceHeight / 2.6,
    width: deviceWidth - 10,
    resizeMode: 'stretch'
  }
};
