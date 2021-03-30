import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
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
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#090909",
    marginBottom: 10
  },
  price: {
    fontSize: 16,
    color: "black"
  },
  cutOffPrice: {
    fontSize: 16,
    color: "#898C94",
    marginLeft: 10,
    textDecorationLine: "line-through"
  },
  discount: {
    fontSize: 16,
    color: "#7468C5",
    marginLeft: 10
  },
  priceTag: {
    fontSize: 16,
    color: "#999"
  },
  tagText: {
    color: "#999",
    alignSelf: "center"
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
  sliderImage : {
    height: (deviceWidth*2/3)-40,
    width: deviceWidth-20,
    resizeMode: 'stretch',
    marginBottom: 10
  },
  p: {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
    color: "#999",
    backgroundColor: "#14CDA8",
    textAlign: 'justify'
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
});
