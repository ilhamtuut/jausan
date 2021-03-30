import React, { Component } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import { Icon, FooterTab, Button, Footer, Text } from "native-base";

import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator } from "react-navigation";
import commonColor from "./theme/variables/commonColor";

import HomePage from "./screens/HomePage";
import Jadwal from "./screens/Jadwal";
import Category from "./screens/Category";
import Settings from "./screens/Settings";

const Main = createMaterialTopTabNavigator(
  {
    HomePage: { screen: HomePage },
    Category: { screen: Category },
    Jadwal: { screen: Jadwal },
    Settings: { screen: Settings },
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: true,
    animationEnabled: true,
    tabBarComponent: props => {
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
              active={props.navigation.state.index === 0 ? true : false}
              style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
              onPress={() => props.navigation.navigate("HomePage")}
            >
              <Icon
                style={
                  props.navigation.state.index === 0
                    ? Style.footerIconActive
                    : Style.footerIcon
                }
                type="SimpleLineIcons"
                name="home"
              />
              <Text
                style={
                  props.navigation.state.index === 0
                    ? Style.footerIconTabText
                    : Style.footerIconText
                }
              >
                Home
              </Text>
            </Button>
            <Button
              active={props.navigation.state.index === 1 ? true : false}
              style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
              onPress={() => props.navigation.navigate("Category")}
            >
              <Icon
                style={
                  props.navigation.state.index === 1
                    ? Style.footerIconActive
                    : Style.footerIcon
                }
                type="SimpleLineIcons"
                name="layers"
              />
              <Text
                style={
                  props.navigation.state.index === 1
                    ? Style.footerIconTabText
                    : Style.footerIconText
                }
              >
                Kategori
              </Text>
            </Button>
            <Button
              active={props.navigation.state.index === 2 ? true : false}
              style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
              onPress={() => props.navigation.navigate("Jadwal")}
            >
              <Icon
                style={
                  props.navigation.state.index === 2
                    ? Style.footerIconActive
                    : Style.footerIcon
                }
                type="SimpleLineIcons"
                name="clock"
              />
              <Text
                style={
                  props.navigation.state.index === 2
                    ? Style.footerIconTabText
                    : Style.footerIconText
                }
              >
                Jadwal
              </Text>
            </Button>
            
            <Button
              active={props.navigation.state.index === 3 ? true : false}
              style={{ paddingLeft: 0, paddingRight: 0, margin: 0 }}
              onPress={() => props.navigation.navigate("Settings")}
            >
              <Icon
                type="SimpleLineIcons"
                style={
                  props.navigation.state.index === 3
                    ? Style.footerIconActive
                    : Style.footerIcon
                }
                name="settings"
              />
              <Text
                style={
                  props.navigation.state.index === 3
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
);

const Style = {
  footerIcon: {
    fontSize: 17,
    color: "#777",
    lineHeight: 20,
    fontWeight: "500"
  },
  footerIconActive: {
    fontSize: 17,
    color: commonColor.brandPrimary,
    lineHeight: 20,
    fontWeight: "500"
  },
  footerIconTabText: {
    fontSize: 11,
    color: commonColor.brandPrimary,
    lineHeight: 15,
    fontWeight: "100",
    textAlign: "center"
  },
  footerIconText: {
    fontSize: 11,
    color: "#777",
    lineHeight: 15,
    fontWeight: "100",
    textAlign: "center"
  }
};

const App = createAppContainer(Main);

export default App;
