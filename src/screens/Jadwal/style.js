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
  roundButtonsWrap: {
    alignItems: "center",
    height: deviceHeight / 6,
    width: deviceWidth / 4 - 4,
    justifyContent: "center",
  },
  roundButtons: {
    height: (deviceWidth - 110) / 6,
    width: (deviceWidth - 110) / 6,
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
  inputBox: {
    maxHeight: 200,
    minHeight: 100,
    textAlignVertical: "top"
  },
  calendar: {
    marginBottom: 10
  },
  viewText: {
    textAlign: 'center',
    paddingTop: 10,
    backgroundColor: 'lightgrey',
    fontSize: 16,
    color: 'green'
  },
  text: {
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#f68002',
    fontSize: 16,
    color: 'white'
  },
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    location: {
        color: '#333333',
        marginBottom: 5,
    },
    button: {
        marginBottom: 8,
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
