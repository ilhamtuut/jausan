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

class BannerSlider extends Component {
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
            <View>
              {(this.props.bannerImageSource) &&
                <Image style={[styles.sliderImage,(this.props.imageStyle) && this.props.imageStyle]} source={{uri: this.props.bannerImageSource}}/>
              }
              {(this.props.bannerImageText) &&
                <View style={styles.sliderText}>
                  <Text style={styles.sliderImageText}>{this.props.bannerImageText}</Text>
                </View>
              }
            </View>
            {(this.props.bannerDescription) &&
              <Text style={styles.desc} numberOfLines={2} ellipsizeMode='tail'>{this.props.bannerDescription}</Text>
            }
            {(this.props.bannerSmallText) &&
              <Text style={styles.time} numberOfLines={1} ellipsizeMode='tail'>{this.props.bannerSmallText}</Text>
            }
          </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  containerSlide:{
    width: deviceWidth - 20
  },
  bannerSliderImagesWrap :{
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.5,
    margin: 10,
    justifyContent: 'space-between'
  },
  sliderImage : {
    height: deviceHeight / 4,
    width: deviceWidth - 20,
    resizeMode: 'stretch'
  },
  sliderText: {
    width: deviceWidth - 20,
    position: 'absolute',
    backgroundColor: '#0a0a0a94',
    padding: 5,
    bottom: 0
  },
  sliderImageText: {
    fontSize: 14,
    fontWeight: '700',
    color: "#b9b7b7"
  },
  smallText :{
    fontSize: 11,
    color: '#a4a5a6',
    marginTop:2,
    marginBottom:0
  },
  tag: {
    fontSize: 14,
    fontWeight: "700",
    color: "#555",
    marginRight: 0
  },
  desc: {
    fontSize: 12,
    fontWeight: "400",
    color: "#555",
    lineHeight: 16,
    marginRight: 0
  },
  time: {
    fontSize: 12,
    fontWeight: "300",
    color: "#888",
    marginRight: 0
  }
});
export default BannerSlider;
