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
  ListItem,
  Body,
  Left,
  Right
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import {Grid, Col, Row} from "react-native-easy-grid";
var deviceWidth = Dimensions.get("window").width;
const {height, width} = Dimensions.get("window");
const bg = require("../../../assets/bg-transparent.png");

class Organisasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle="ORGANISASI"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "#fff", marginBottom: 0 }}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            <List style={{ backgroundColor: '#fff' }}>
              <ListItem 
                style={{marginLeft: 0}}
                thumbnail 
                onPress={() => navigation.navigate("StrukturOrganisasi")}>
                <Body>
                  <Text style={Style.textMuted}>Struktur Organisasi</Text>
                </Body>
              </ListItem>
              <ListItem 
                style={{marginLeft: 0}}
                thumbnail 
                onPress={() => navigation.navigate("ListPendaftaran")}>
                <Body>
                  <Text style={Style.textMuted}>Pendaftaran Kegiatan</Text>
                </Body>
              </ListItem>
            </List>
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
export default connect(mapStateToProps, bindAction)(Organisasi);
