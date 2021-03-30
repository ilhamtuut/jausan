import React, { Component } from "react";
import {
  Container,
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
  Thumbnail,
  Grid,
  Col,
  Left,
  Right,
  Body,
  Row,
  Toast,
  Spinner
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  Styleheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage
} from "react-native";

import Style from "./style.js";
import { connect } from "react-redux";
import MyFooter from "../CommonComponents/Footer";
import { StackActions, NavigationActions } from 'react-navigation';
import ThemeHeader from "../CommonComponents/Header/index.js";
import commonColor from "../../theme/variables/commonColor.js";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { itemsFetchData, itemsIsLoading, fetchDataUser } from "../../actions/profile";
import Root from '../../root/Url';
const bg = require("../../../assets/bg-transparent.png");
const profile = require("../../../assets/user.png");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      dataEvent: [],
      loading: true,
      valid: true
    };
  }

  componentWillMount(){
    this.get_data();
  }

  get_data(){
    fetch(Root.link + 'profil', {
      method: 'GET',
      headers: {
        'Accept' : 'application/json', 
        'Authorization' : 'Bearer ' + global.access_token
      },
    })
    .then(response => response.json())
    .then((responseJson) => {
      // console.warn(JSON.stringify(responseJson));
      try{
        var obj = responseJson;
        if(obj.success){
          this.setState({
            data: obj.data,
            dataEvent: obj.data.dataevents,
            loading: false,
          });
        }else{
          this.props.navigation.dispatch(resetAction);
          AsyncStorage.clear();
          this.setState({loading: false});
        }
      }catch(err){
        console.log(err.message + " Error");
        this.setState({loading: false});
      }
    }).catch(function(err) {
        this.setState({loading: false});
        console.log(err.message + " Error");
    }).done();
  }

  logout(){
    this.props.navigation.dispatch(resetAction);
    AsyncStorage.clear();
  }

  Capitalize(str){
    if(str){
      var pieces = str.split(" ");
      for ( var i = 0; i < pieces.length; i++ ){
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1);
      }
      return pieces.join(" ");
    }
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
            PageTitle="DATA PROFIL"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
           />
            <Content
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ backgroundColor: "transparent", marginBottom: null }}
                showsVerticalScrollIndicator={false}
              >
              <Grid style={{ marginBottom: 5, backgroundColor: '#fff' }}>
                <Col style={{ justifyContent: "center", alignItems: 'center' }}>
                  <View 
                    style={{ marginTop: 10, borderWidth: 2, backgroundColor: '#eee', borderColor: '#ddd', borderRadius: 200, height: 154, width: 154 }} 
                    >
                  <Thumbnail 
                    onError={() => this.setState({ valid : false }) }
                    style={{ borderRadius: 200, height: 150, width: 150 }} 
                    source={ (this.state.valid) ? { uri: this.state.data.photo_diri } : profile } />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button
                      small
                      primary
                      onPress={() => navigation.navigate('EditProfile',{
                        params: this.state.data
                      })}
                    >
                      <Icon 
                        type="FontAwesome5"
                        name="user-cog" style={Style.addIcon} />
                      <Text style={Style.postText}>Edit Profile</Text>
                    </Button>
                  </View>
                </Col>
              </Grid>
              <View>
                <View style={{ padding: 10, backgroundColor: '#fff' }}>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Nomor Anggota</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ (this.state.data.kartus) ? this.state.data.kartus.kartu_anggota : 'Menunggu Konfirmasi' }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>NIK</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.state.data.nik }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Nama</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.Capitalize(this.state.data.name) }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Tanggal Lahir</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ (this.state.data.ttl) }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>HP</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.state.data.telepon }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Email</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.state.data.email }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Alamat</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.state.data.alamat }</Text>
                    </View>
                  </ListItem>
                  <ListItem style={{ marginLeft: 0, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                    <View>
                      <Text style={Style.textMutedLight}>Anak Cabang</Text>
                    </View>
                    <View>
                      <Text style={Style.textMutedLight}>{ this.state.data.cabangs.name }</Text>
                    </View>
                  </ListItem>
                </View>
              </View>

              <View style={{ marginBottom: 20 }}>
              <Text style={Style.text}>Daftar Pelatihan</Text>
              <List style={{ backgroundColor: '#fff' }}>
                {
                  this.state.dataEvent.map((item, index) => (
                    <ListItem 
                        key={index}
                        avatar 
                        style={{ marginLeft: 0 }}>
                      <Body>
                        <Text style={{ color: '#f68002' }}>{ item.event.name }</Text>
                        <Text style={{ fontSize: 12 }} note>Status = {(item.status == 0) ? "Menunggu Konfirmasi" : "Sudah Konfirmasi"}</Text>
                      </Body>
                    </ListItem>
                  ))
                }
              </List>
              {!this.state.dataEvent.length &&
                <Body style={{ padding: 10, backgroundColor: '#FFF', width: deviceWidth }}>
                  <Text note>Belum ada pelatihan yang diikuti</Text>
                </Body>
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
    fetchData: bol => dispatch(itemsFetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    fetchDataUser: token => dispatch(fetchDataUser(token)),
  };
}

const mapStateToProps = state => ({
  hasErrored: state.profileReducer.hasErrored,
  isLoading: state.profileReducer.isLoading,
  items: state.profileReducer.items
});
export default connect(mapStateToProps, bindAction)(Profile);
