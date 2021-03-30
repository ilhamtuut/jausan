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
  Spinner
} from "native-base";
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class Abouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  componentWillMount(){

  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle="TENTANG APLIKASI"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff", marginBottom: 30, padding: 10 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <View
              style={{ alignItems: "center", marginBottom: 10 }}
              >
              <Image
                source={require("../../../assets/logo.png")}
                style={Style.backgroundImage}
              />
            </View>
            <Text style={{ textAlign: 'center', color: '#f68002', fontSize: 14 }}>Versi 1.0.0</Text>
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
export default connect(mapStateToProps, bindAction)(Abouts);
