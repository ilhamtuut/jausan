import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { List, ListItem, InputGroup, Input, Icon, Card, CardItem, Body, Grid, Col, Row } from 'native-base';
import Swiper from "react-native-swiper";

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class TokohImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryDrop: null
        };
    }
    categoryDropdown(id) {
        if(this.state.categoryDrop === id) {
            this.setState({categoryDrop: null});
            return;
        }
        this.setState({ categoryDrop: id });
    }
  render() {
    
    return (
      <TouchableOpacity
          activeOpacity={1}
          onPress={this.props.onPress}
        >
          <View style={styles.containerSlide}>
            {(this.props.bannerImageSource) &&
              <Image style={[styles.sliderImage,(this.props.imageStyle) && this.props.imageStyle]} source={{uri: this.props.bannerImageSource}}/>
            }
            <View style={styles.viewText}>
              {(this.props.bannerImageText) &&
                <Text style={styles.tag}>{this.props.bannerImageText}</Text>
              }
              {(this.props.bannerDescription) &&
                <Text style={styles.desc} numberOfLines={2} ellipsizeMode='tail'>{this.props.bannerDescription}</Text>
              }
              {(this.props.bannerSmallText) &&
                <Text style={styles.time} numberOfLines={1} ellipsizeMode='tail'>{this.props.bannerSmallText}</Text>
              }
            </View>
          </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
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
    height: deviceHeight / 3.5,
    width: deviceWidth - 10,
    resizeMode: 'stretch'
  },
  sliderImageText: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5
  },
  smallText :{
    fontSize: 11,
    color: '#a4a5a6',
    marginTop:2,
    marginBottom:0
  },
  tag: {
    textAlign: 'center', 
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    marginRight: 0
  },
  desc: {
    textAlign: 'center', 
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
    lineHeight: 16,
    marginRight: 0
  },
  time: {
    textAlign: 'center', 
    fontSize: 13,
    fontWeight: "300",
    color: "#fff",
    marginRight: 0
  },
  viewText : {
    backgroundColor: '#f68002',
    padding: 5
  }
});
export default TokohImage;
