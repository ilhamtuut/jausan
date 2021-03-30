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
import { List, ListItem, InputGroup, Input, Icon, Card, CardItem, Body} from 'native-base';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

class Banner extends Component {
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
      <CardItem button onPress={this.props.onPress} style={{paddingTop:0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0}}>
        <Image style={[styles.sliderImage,(this.props.imageStyle) && this.props.imageStyle]} 
          source={{uri: this.props.bannerImageSource}}/>
          <View style={styles.sliderText}>
            <Text style={styles.sliderImageText}>{this.props.bannerImageText}</Text>
          </View>
      </CardItem>
    );
  }
}
const styles = StyleSheet.create({
  bannerSliderImagesWrap :{
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 0.5,
    margin: 10,
    justifyContent: 'space-between'
  },
  sliderImage : {
    height: (deviceWidth*2/3)-40,
    width: deviceWidth,
    resizeMode: 'stretch'
  },
  sliderText: {
    width: deviceWidth,
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
  }
});
export default Banner;
