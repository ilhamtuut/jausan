import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  bagTopContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: -5,
    marginHorizontal: 5
  },
  textMuted: {
    textAlign: 'center', 
    fontSize: 10,
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
};
