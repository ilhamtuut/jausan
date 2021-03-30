import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity
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
  Left,
  Right,
  Body
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class DetailQuran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quran: []
    };
  }

  render() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const titlePage = params.titlePage +" ("+ params.asma +")";
    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle={titlePage}
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "transparent", marginBottom: 30 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <Text style={{ textAlign: 'center', paddingTop: 100, color: '#555' }}>Comming Son</Text>
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
export default connect(mapStateToProps, bindAction)(DetailQuran);
