import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get("window").width;

export default {
  seperator: {
    alignItems: "center",
    height: 2,
    width: "100%",
    marginTop: 5,
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
    fontSize: 14,
    fontWeight: "300",
    color: "#696d79",
    margin: 0,
    marginBottom: 0
  },
  sliderImageText: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 5
  },
  smallText: {
    fontSize: 11,
    color: "#a4a5a6",
    marginTop: 2.5,
    marginBottom: 10
  },
  price: {
    color: "#000"
  },
  cutOffPrice: {
    color: "#a4a5a6",
    marginLeft: 5,
    textDecorationLine: "line-through"
  },
  discount: {
    color: commonColor.brandSuccess,
    marginLeft: 5
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
  roundButtonsWrap: {
    alignItems: "center",
    height: (deviceWidth - 150) / 2, 
    width: (deviceWidth - 150) / 2,
    justifyContent: "center",
  },
  roundButtons: {
    height: (deviceWidth - 110) / 4,
    width: (deviceWidth - 110) / 4,
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
  wrapper: {
    padding: 0,
    height: deviceHeight / 3.1,
    flex: 1,
    width: null
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  sizes: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderColor: "#B2BAB5",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10
  },
  sizesAlt: {
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderColor: "#7468C5",
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 10
  },
  backArrow: {
    color: "#9FA29F"
  },
  titleText: {
    color: "#9FA29F"
  },
  bag: {
    fontSize: 25,
    color: "#9FA29F"
  },
  more: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#9FA29F"
  },
  pagination: {
    bottom: 5
  },
  defaultDot: {
    backgroundColor: "#ddd",
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  actDot: {
    backgroundColor: "black",
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  pic: {
    flex: 1,
    resizeMode: "contain",
    alignSelf: "center"
  },
  info: {
    position: "absolute",
    bottom: 330,
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center"
  },
  infoIcon: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    color: "#ddd"
  },
  view1: {
    marginTop: 25,
    backgroundColor: "white"
  },
  productName: {
    fontSize: 16,
    color: "#090909",
    marginLeft: 10
  },
  priceTag: {
    fontSize: 16,
    color: "#999"
  },
  tagText: {
    color: "#999",
    alignSelf: "center",
    marginTop: -4
  },
  sizeView: {
    flex: 1,
    flexDirection: "row"
  },
  sizeView1: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10
  },
  rulerIcon: {
    fontSize: 18,
    color: "#999"
  },
  sizeView2: {
    flex: 2,
    alignItems: "flex-start"
  },
  sizeText: {
    color: "#999",
    marginLeft: -15,
    marginTop: 0
  },
  sizeView3: {
    flex: 8,
    alignItems: "flex-end",
    marginRight: 10
  },
  chartText: {
    fontSize: 12,
    color: "#7468C5"
  },
  sizeButtons: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 0,
    paddingVertical: 10
  },
  footer: {
    flex: 1,
    flexDirection: "row"
  },
  saveButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#535766",
    alignItems: "center",
    justifyContent: "center"
  },
  listIcon: {
    fontSize: 20,
    color: "white"
  },
  saveText: {
    fontSize: 16,
    color: "white"
  },
  bagButton: {
    flex: 1.5,
    flexDirection: "row",
    backgroundColor: "#14CDA8",
    alignItems: "center",
    justifyContent: "center"
  },
  bagIcon: {
    fontSize: 16,
    color: "white"
  },
  bagText: {
    fontSize: 16,
    color: "white"
  },
  wrapperBanner: {
    height: (deviceWidth*2/3)-40,
    width: deviceWidth,
    flex: 1,
    marginBottom: 10
  },
};
