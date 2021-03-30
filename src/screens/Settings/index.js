import React, { Component } from "react";
import {
  Container,
  Text,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Badge,
  List,
  ListView,
  ListItem,
  Left,
  Right,
  Body
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  AsyncStorage
} from "react-native";
import Style from "./style.js";
import ThemeHeader from "../CommonComponents/Header/index.js";
import MyFooter from "../CommonComponents/Footer";
import { StackActions, NavigationActions } from 'react-navigation';
const bg = require("../../../assets/bg-transparent.png");
const goLogin = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createAddress : false,
    };
  }

  logout(){
    this.props.navigation.dispatch(goLogin);
    AsyncStorage.clear();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
        <ThemeHeader
            PageTitle="PENGATURAN"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
        <Content
          style={{ backgroundColor: "transparent", padding: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <List>
            <ListItem button onPress={() => navigation.navigate("ChangePassword")}>
              <Icon 
                  style={{ fontSize: 15, marginRight: 5 }}
                  type="AntDesign"
                  name="lock"
                />
              <Text style={{color: "#555"}}>
                Ubah Kata Sandi
              </Text>
            </ListItem>
            <ListItem button onPress={() => navigation.navigate("Abouts",{
                        titlePage: 'About MyToken',
                      })}>
              <Icon 
                  style={{ fontSize: 15, marginRight: 5 }}
                  type="AntDesign"
                  name="infocirlceo"
              />
              <Text style={{color: "#555"}}>
                Tentang Aplikasi
              </Text>
            </ListItem>
            {/*<ListItem button onPress={() => this.logout() }>
              <Icon 
                  style={{ fontSize: 15, marginRight: 5 }}
                  type="AntDesign"
                  name="logout"
              />
              <Text style={{color: "#555"}}>Keluar</Text>
            </ListItem>*/}
          </List>
        </Content>
        </ImageBackground>
        {/*<MyFooter navigation={navigation} selected={"settings"} />*/}
      </Container>
    );
  }
}
export default Settings;