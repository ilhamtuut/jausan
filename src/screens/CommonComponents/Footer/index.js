import React, { Component } from "react";
import { Image, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import {
  View,
  Text,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  StyleProvider,
  Button,
  Icon
} from "native-base";

import Style from "./style.js";

class ThemeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false
    };
  }

  componentWillMount() {
    this.setState({showMenu: global.showMenu});
  }

  render() {
    // console.warn(global.showMenu);
    const tabs = this.props;
    const navigation = this.props.navigation;
    return (
      <Footer
        style={{
          marginHorizontal: -10,
          position: "absolute",
          bottom: 0
        }}
      >
        <FooterTab
          style={{
            width: Dimensions.get("window").width,
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <Button
            active={tabs.selected === "home" ? true : false}
            style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
            onPress={() => navigation.navigate("HomePage")}
          >
            <Icon
              style={
                tabs.selected === "home"
                  ? Style.footerIconActive
                  : Style.footerIcon
              }
              type="SimpleLineIcons"
              name="home"
            />
            <Text
              style={
                tabs.selected === "home"
                  ? Style.footerIconTabText
                  : Style.footerIconText
              }
            >
              Home
            </Text>
          </Button>
          <Button
            active={tabs.selected === "categories" ? true : false}
            style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
            onPress={() => navigation.navigate("Category")}
          >
            <Icon
              style={
                tabs.selected === "categories"
                  ? Style.footerIconActive
                  : Style.footerIcon
              }
              type="SimpleLineIcons"
              name="layers"
            />
            <Text
              style={
                tabs.selected === "categories"
                  ? Style.footerIconTabText
                  : Style.footerIconText
              }
            >
              Kategori
            </Text>
          </Button>
          <Button
            active={tabs.selected === "bag" ? true : false}
            style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
            onPress={() => navigation.navigate("Jadwal")}
          >
            <Icon
              style={
                tabs.selected === "bag"
                  ? Style.footerIconActive
                  : Style.footerIcon
              }
              type="SimpleLineIcons"
              name="clock"
            />
            <Text
              style={
                tabs.selected === "bag"
                  ? Style.footerIconTabText
                  : Style.footerIconText
              }
            >
              Jadwal
            </Text>
          </Button>
          
          <Button
            active={tabs.selected === "settings" ? true : false}
            style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
            onPress={() => navigation.navigate("Settings")}
          >
            <Icon
              type="SimpleLineIcons"
              style={
                tabs.selected === "settings"
                  ? Style.footerIconActive
                  : Style.footerIcon
              }
              name="settings"
            />
            <Text
              style={
                tabs.selected === "settings"
                  ? Style.footerIconTabText
                  : Style.footerIconText
              }
            >
              Pengaturan
            </Text>
          </Button>

        </FooterTab>
      </Footer>
    );
  }
}
export default ThemeFooter;
