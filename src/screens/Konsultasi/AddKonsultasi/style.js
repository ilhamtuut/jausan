import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import commonColor from "../../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  backgroundImageLogin: {
    flex:1,
   	position: 'absolute', 
    resizeMode: 'cover',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  bagTopContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -5,
    marginHorizontal: 5
  },
  textMuted: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500"
  },
  textMutedLight: {
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
  image: {
    height: (deviceWidth - 250) / 4,
    width: (deviceWidth - 250) / 4,
    borderRadius: (deviceWidth - 250) / 4 / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    resizeMode: "contain",
  },
  spinnerStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  spinnerTextStyle: {
      color: '#AF263D'
  },
  spinnerBackground: {
      flex: 1,
      width: null,
      height: deviceHeight,
      backgroundColor: "rgba(0,0,0,0.1)"
  }
};