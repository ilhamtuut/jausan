import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  seperator: {
    alignItems: "center",
    height: 5,
    width: 80,
    borderRadius: 5,
    backgroundColor: "#888"
  },
  backgroundImageLogin: {
    flex:1,
    position: 'absolute', 
    resizeMode: 'cover',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  bannerHeading: {
    fontSize: 11,
    fontWeight: "300",
    color: "#696d79",
    marginLeft: 0,
    paddingLeft: 0
  },
  clearAll: {
    fontSize: 12,
    fontWeight: "400",
    color: commonColor.brandDanger
  },
  contactList: {
    alignItems: "center"
  },
  contactListItem: {
    color: commonColor.brandPrimary,
    fontSize: 18
  },
  noBorder: {
    borderBottomWidth: 0
  },
  roundButtonsWrap: {
    alignItems: "center",
    height: deviceHeight / 6,
    width: deviceWidth / 4 - 4,
    justifyContent: "center",
  },
  roundButtons: {
    height: (deviceWidth - 110) / 5,
    width: (deviceWidth - 110) / 5,
    // borderRadius: (deviceWidth - 60) / 4 / 2,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
    resizeMode: "contain",
  },
  text: {
    marginTop: 5,
    color: "#fff",
    alignSelf: "center",
    fontSize: 11,
    fontWeight: "500",
  },
  bellIcon: {
    fontSize: 28,
    color: commonColor.brandPrimary
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
    lineHeight: 16,
    marginRight: 10
  },
  time: {
    fontSize: 13,
    fontWeight: "300",
    color: "#888",
    marginBottom: 4,
    marginRight: 10
  },
  notifyImage: {
    width: null,
    height: deviceWidth / 2,
    margin: 6,
    resizeMode: "contain",
    borderColor: "#ccc",
    justifyContent: "center"
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
  textBadge: {
    fontSize: 13,
    fontWeight: "500"
  },
};
