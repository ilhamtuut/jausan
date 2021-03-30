import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  Share,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  InputGroup,
  Input,
  Footer,
  Text,
  FooterTab,
  Icon,
  Card,
  CardItem,
  Label,
  Form,
  Item,
  Segment,
  List,
  ListView,
  ListItem,
  Thumbnail,
  Grid,
  Col,
  Left,
  Right,
  Body,
  Row
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../../CommonComponents/Header/index.js";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../../assets/bg-transparent.png");

class DetailTokog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : ''
    }
  }

  // Share Text
  onShare = async () => {
    try {
      const navigation = this.props.navigation;
      const params = navigation.state.params.params;
      const result = await Share.share({
        message: this.Capitalize(params.name)
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const navigation = this.props.navigation;
    const params = navigation.state.params.params;

    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle="Detail Kyaiku"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "transparent", marginBottom: null }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <Grid style={{ marginBottom: 5, backgroundColor: '#fff' }}>
              <Col style={{ justifyContent: "center", alignItems: 'center' }}>
                <Image style={{ height: 300, width: deviceWidth, alignItems: "center", justifyContent: "center", resizeMode: "contain" }} source={{uri: params.foto}} />
              </Col>
            </Grid>
            {/*<TouchableOpacity
              activeOpacity={1}
              onPress={ this.onShare }
              >
              <Text style={{ color: '#f68002', textAlign: 'center', padding: 5  }}><Icon style={{ color: '#f68002', fontSize: 16 }} name="share"/> Bagikan</Text>
            </TouchableOpacity>*/}
            <View style={{ backgroundColor: '#fff', marginBottom: 20 }}>
              <ListItem style={{ marginLeft: 0 }}>
                <Body>
                  <Text style={{ color: '#f68002', fontSize: 14 }}>Nama</Text>
                  <Text note>{this.Capitalize(params.name)}</Text>
                </Body>
              </ListItem>
              <ListItem style={{ marginLeft: 0 }}>
                <Body>
                  <Text style={{ color: '#f68002', fontSize: 14 }}>Alamat</Text>
                  <Text note>{this.Capitalize(params.alamat)}</Text>
                </Body>
              </ListItem>
              <ListItem style={{ marginLeft: 0 }}>
                <Body>
                  <Text style={{ color: '#f68002', fontSize: 14 }}>Keterangan</Text>
                  <Text note>{this.Capitalize(params.keterangan)}</Text>
                </Body>
              </ListItem>
              <ListItem style={{ marginLeft: 0 }}>
                <Body>
                  <Text style={{ color: '#f68002', fontSize: 14 }}>Akun Media Sosial</Text>
                  <Text note onPress={() => Linking.openURL(params.facebook.includes('http') ? params.facebook :'https://facebook.com/')}>
                    <Icon style={{ color: '#4267b2', fontSize: 12, marginLeft: 10 }} type="FontAwesome5" name="facebook" /> {params.facebook}
                  </Text>
                  <Text note onPress={() => Linking.openURL(params.twitter.includes('http') ? params.twitter :'https://twitter.com/')}>
                    <Icon style={{ color: '#1da1f2', fontSize: 12, marginLeft: 10 }} type="FontAwesome5" name="twitter" /> {params.twitter}
                  </Text>
                  <Text note onPress={() => Linking.openURL(params.instagram.includes('http') ? params.instagram :'https://www.instagram.com/')}>
                    <Icon style={{ color: '#d81d4a', fontSize: 12, marginLeft: 10 }} type="FontAwesome5" name="instagram" /> {params.instagram}
                  </Text>
                  <Text note onPress={() => Linking.openURL(params.youtube.includes('http') ? params.youtube : 'https://www.youtube.com/')}>
                    <Icon style={{ color: '#f00', fontSize: 12, marginLeft: 10 }} type="FontAwesome5" name="youtube" /> {params.youtube}
                  </Text>
                </Body>
              </ListItem>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {

  };
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, bindAction)(DetailTokog);
