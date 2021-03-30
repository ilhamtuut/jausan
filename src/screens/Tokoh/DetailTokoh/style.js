import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import commonColor from "../../../theme/variables/commonColor.js";

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
  seperator: {
    alignItems: "center",
    height: 15,
    width: 1.5,
    backgroundColor: "#888"
  },
  profileCoverPic: {
    resizeMode: "cover",
    alignSelf: "center",
    height: 150
  },
  profileName: {
    color: "#F6F6F7",
    paddingTop: 5,
    fontSize: 20
  },
  bio: {
    fontStyle: "italic",
    fontSize: 12,
    color: "#525664"
  },
  view6: {
    height: 500,
    borderColor: "#F6F6F7",
    borderWidth: 1
  },
  view7: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  wcsButton: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
  wcsText: {
    fontSize: 10,
    color: "#525664"
  },
  moreIcon: {
    color: commonColor.brandPrimary
  },
  addIcon: {
    fontSize: 14,
    color: "#fff",
  },
  view8: {
    alignSelf: "center",
    justifyContent: "center"
  },
  postText: {
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center"
  },
  textMuted: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500"
  },
  textMutedLight: {
    marginLeft: 10,
    fontSize: 13,
    color: "#555",
    fontWeight: "300"
  },
  discountedText: {
    fontSize: 13,
    fontWeight: "300",
    color: commonColor.brandPrimary,
    marginLeft: 2
  },
  price: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555"
  },
};
