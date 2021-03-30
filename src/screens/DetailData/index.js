import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  Item,
  Input,
  CardItem,
  Left,
  Body,
  Right,
  Badge,
  List,
  ListView,
  ListItem,
  Tabs,
  Tab,
  Footer,
  Spinner
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import PDFView from 'react-native-view-pdf';
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
import ThemeHeader from "../CommonComponents/Header";
const bg = require("../../../assets/bg-transparent.png");

class DetaiData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      visible: true
    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  onError(){
    this.hideSpinner();
     Alert.alert(
      '',
      'Kesalahan Memuat Data',
      [
        {text: 'Kembali', onPress: () => this.props.navigation.goBack() }
      ],
      {cancelable: false},
    );
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const navigation = this.props.navigation;
    const params = navigation.state.params.params;
    const resourceType = 'url';
    const resources = {
      url: params.content_pdf
    };
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.visible}
          onRequestClose={() => {
            this.setState({ visible: true });
          }}>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Modal>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle={this.Capitalize(params.judul)}
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <View style={{ flex: 1 }}>
              <PDFView
                fadeInDuration={250.0}
                style={{ flex: 1, marginBottom: 10 }}
                resource={resources[resourceType]}
                resourceType={resourceType}
                onLoad={() => this.hideSpinner() }
                onError={() => this.onError() }
              />
          </View>
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
export default connect(mapStateToProps, bindAction)(DetaiData);
