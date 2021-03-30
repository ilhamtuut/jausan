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
import Root from '../../root/Url';
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class ListPendaftaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      event: []
    };
  }

  componentWillMount(){
    this.get_data();
  }

  get_data(){
    fetch(Root.link + 'event', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.warn(JSON.stringify(responseJson))
        try{
          var obj = responseJson;
          if(obj.success){
            this.setState({
              event: obj.data,
              loading: false,
            });
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
  }

  render() {
    const navigation = this.props.navigation;
    if (this.state.loading) {
      return (
        <Container>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Container>);
    } else {
      return (
        <Container>
          <ImageBackground source={bg} style={Style.backgroundImageLogin}>
            <ThemeHeader
              PageTitle="PENDAFTARAN KEGIATAN"
              IconLeft="arrow-back"
              route="homepage"
              navigation={navigation}
            />
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "#fff", marginBottom: 30, padding: 0 }}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
            <View style={{ padding: 5, backgroundColor: '#fff' }}>
              {
                this.state.event.map((item, index) => (
                  <Button
                    key={index}
                    style={{ margin: 2, width:'99%' }}
                    primary
                    small
                    bordered
                    rounded
                    onPress={() => navigation.navigate("Formulir",{
                      params: item
                    })}
                  >
                    <Icon type="SimpleLineIcons" active name="note" style={{ fontSize: 14}} />
                    <Text> {item.name} </Text>
                  </Button>
                ))
              }
            </View>
            </Content>
          </ImageBackground>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {

  };
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, bindAction)(ListPendaftaran);
