import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import commonColor from "../../theme/variables/commonColor";

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  bannerHeading: {
    fontSize: 16,
    fontWeight: "300",
    color: "#696d79",
    margin: 10,
    marginBottom: 5
  },
  bannerAll: {
    fontSize: 14,
    fontWeight: "300",
    color: "#696d79",
    margin: 10,
    marginBottom: 5
  },
  tag: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginRight: 10
  },
  desc: {
    fontSize: 14,
    fontWeight: "400",
    color: "#333",
    lineHeight: 18,
    marginRight: 10
  },
  time: {
    fontSize: 13,
    fontWeight: "300",
    color: "#888",
    marginBottom: 4,
    marginRight: 10
  },
  status: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "400",
    color: "#1BAD3F",
    lineHeight: 16,
    marginRight: 10
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
    fontWeight: "bold"
  },
  textMutedLight: {
    textAlign: 'center',
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
    height: (deviceWidth - 250) / 2,
    width: (deviceWidth - 250) / 2,
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
      color: '#FFF'
  },
  spinnerBackground: {
      flex: 1,
      width: null,
      height: deviceHeight,
      backgroundColor: "rgba(0,0,0,0.1)"
  },
  spinnerMore: {
      height: 30,
      width: 30,
      justifyContent: 'center',
      alignItems: 'center'
  }
});
