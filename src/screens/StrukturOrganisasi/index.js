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
  Right,
  Thumbnail,
  Spinner
} from "native-base";
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import {Grid, Col, Row} from "react-native-easy-grid";
var deviceWidth = Dimensions.get("window").width;
const {height, width} = Dimensions.get("window");
const bg = require("../../../assets/bg-transparent.png");

class StrukturOrganisasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: []
    };
  }
  componentWillMount(){   
    this.get_data();
  }

  get_data(){
    fetch(Root.link + 'jabatan', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.warn(JSON.stringify(responseJson));
        try{
          var obj = responseJson;
          if(obj.success){
            this.setState({
              data: obj.data,
              loading: false
            });
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
  }
  
  onClick(){

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
              PageTitle="STRUKTUR ORGANISASI"
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
                {
                  this.state.data.map((item, index) => (
                    <ListItem 
                      key={index}
                      avatar
                      onPress={() => this.onClick() }
                      >
                      <Left>
                        <Thumbnail source={{uri: item.foto}} />
                      </Left>
                      <Body>
                        <Text style={{ color: '#f68002' }}>{ item.nama }</Text>
                        <Text note>{ item.jabatan }</Text>
                      </Body>
                    </ListItem>
                  ))
                }
              </List>
              
              {!this.state.data.length &&
                <Body style={{ padding: 10, marginTop: 20 }}>
                  <Text note>Tidak Ada Data</Text>
                </Body>
              }
              {/*<List>
                <ListItem 
                  style={{marginLeft: 0}}
                  thumbnail 
                  onPress={() => this.onClick() }>
                  <Body>
                    <Text style={Style.textMuted}>Struktur Cabang</Text>
                  </Body>
                </ListItem>
                <ListItem 
                  style={{marginLeft: 0}}
                  thumbnail 
                  onPress={() => this.onClick() }>
                  <Body>
                    <Text style={Style.textMuted}>Struktur Anak Cabang</Text>
                  </Body>
                </ListItem>
              </List>*/}
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
export default connect(mapStateToProps, bindAction)(StrukturOrganisasi);
