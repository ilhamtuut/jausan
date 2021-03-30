import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  Text,
  Alert,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  BackHandler,
  ToastAndroid
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Card,
  CardItem,
  Body,
  Grid,
  Col,
  Row,
  Spinner
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import Swiper from "react-native-swiper";
import MyFooter from "../CommonComponents/Footer";
import Banner from "../CommonComponents/Banner/index.js";
import ListDropdown from "../CommonComponents/ListDropdown/index.js";
import RoundImageButton from "../CommonComponents/RoundImageButton/index.js";
import BannerSlider from "../CommonComponents/BannerSlider/index.js";
import ThemeHeader from "../CommonComponents/Header/index.js";
import commonColor from "../../theme/variables/commonColor.js";
import NotifyContent from "../CommonComponents/NotifyContent";
import { itemsFetchData } from "../../actions";
import { StackActions, NavigationActions } from 'react-navigation';
const bg = require("../../../assets/bg-transparent.png");
const goLogin = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

let backHandlerClickCount = 0;
const exitAlert = () => {
  Alert.alert(
    '',
    'Apakah Anda ingin keluar dari aplikasi?',
    [
      {text: 'Tidak', style: 'cancel'},
      {text: 'Ya', onPress: () => BackHandler.exitApp()}
    ],
    {cancelable: false},
  );
};

const showToastWithGravity = (click) => {
    ToastAndroid.showWithGravityAndOffset(
      "Klik 2 Kali Untuk Keluar",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: "",
      refresh_token: "",
      showSwiper: false,
      authLogin: false,
      totalNews: 0
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount(){
    this.props.fetchData();
    this.getSession();
  }
  
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    setTimeout(() => {
      this.setState({showSwiper: true});
    }, 100);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    let index = this.props.navigation.dangerouslyGetParent().state.index;
    if (index == 0) {
      const {
        clickedPosition
      } = this.state;
      backHandlerClickCount += 1;
      if ((clickedPosition !== 1)) {
        if ((backHandlerClickCount < 2)) {
          showToastWithGravity(backHandlerClickCount);
        } else {
          exitAlert();
        }
      }
    }else{
      this.props.navigation.goBack(null);
    }
    // timeout for fade and exit
    setTimeout(() => {
      backHandlerClickCount = 0;
    }, 2000);
    return true;
  }

  getSession(){
    AsyncStorage.getItem('session_user', (err, result) => {
      if(result != null && result != ""){
        var data = JSON.parse(result);
        global.access_token = data.access_token;
        this.setState({ 
          access_token: data.access_token,
          refresh_token: data.refresh_token,
          authLogin: true 
        });
      }else{
        this.props.fetchData();
      }
    });
  }

  logout(){
    this.props.navigation.dispatch(goLogin);
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

  getParsedDate(strDate){
    var strSplitDate = String(strDate).split(' ');
    var date = new Date(strSplitDate[0]);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var m = '';
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    // if (mm < 10) {
    //     mm = '0' + mm;
    // }

    if(mm == 1){
      m = 'Januari';
    }else if(mm == 2){
      m = 'Februari';
    }else if(mm == 3){
      m = 'Maret';
    }else if(mm == 4){
      m = 'April';
    }else if(mm == 5){
      m = 'Mei';
    }else if(mm == 6){
      m = 'Juni';
    }else if(mm == 7){
      m = 'Juli';
    }else if(mm == 8){
      m = 'Agustus';
    }else if(mm == 9){
      m = 'September';
    }else if(mm == 10){
      m = 'Oktober';
    }else if(mm == 11){
      m = 'November';
    }else if(mm == 12){
      m = 'Desember';
    }

    date =  dd + " " + m + " " + yyyy;
    return date.toString();
  }

  infoRegister = () => {
    Alert.alert(
      'Informasi',
      'Siapkan Foto Diri dan Foto KTP',
      [
        {text: 'Tidak', style: 'cancel'},
        {text: 'Ya', onPress: () => this.props.navigation.navigate("Register")}
      ],
      {cancelable: false},
    );
  };

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoading) {
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
            {/*<ThemeHeader PageTitle="Jausan" />*/}
            <Content
              contentContainerStyle={{ paddingBottom: 10 }}
              style={{ backgroundColor: "#fff", marginBottom: null }}
              showsVerticalScrollIndicator={false}
            >
              <Card style={{ height: 80, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, backgroundColor: "#fff", marginBottom: 10, marginTop: 0, marginLeft: 0, marginRight: 0, padding:20 }}>
                <View style={{ flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
                  <View>
                      <Image style={{ height: 45, width: 45, resizeMode: "cover", alignItems: "center", justifyContent: "center" }} source={require("../../../assets/iconv.png")} />
                  </View>
                  <View>
                      <Text style={{ color: '#f68002', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Jaringan Solidaritas</Text>
                      <Text style={{ color: '#f68002', textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Kemanusian (JAUSAN)</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate((this.state.authLogin) ? "Profile" : "Login")}
                      >
                      <Image style={{ height: 45, width: 45, resizeMode: "cover", alignItems: "center", justifyContent: "center" }} source={require("../../../assets/user.png")} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
              
              <View style={{ paddingTop: 20, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 }}>
                <Grid>
                  <Col style={{ justifyContent: "center", alignItems: 'center'}}>
                      <RoundImageButton
                        nav={"Agenda"}
                        titlePage={"Agenda"}
                        navigation={navigation}
                        roundImageText={"Agenda"}
                        roundImageSource={require("../../../assets/icon/agenda.png")}
                      />
                  </Col>
                  <Col style={{ justifyContent: "center", alignItems: 'center'}}>
                      <RoundImageButton
                        nav={"AddKonsultasi"}
                        titlePage={"Saran"}
                        navigation={navigation}
                        roundImageText={"Saran"}
                        roundImageSource={require("../../../assets/icon/saran.png")}
                      />
                  </Col>
                </Grid>
                <Grid>
                  <Col style={{ justifyContent: "center", alignItems: 'center'}}>
                      <RoundImageButton
                        nav={(this.state.authLogin) ? "Organisasi" : "Login"}
                        titlePage={"Organisasi"}
                        navigation={navigation}
                        roundImageText={"Organisasi"}
                        roundImageSource={require("../../../assets/icon/categorize.png")}
                      />
                  </Col>
                  <Col style={{ justifyContent: "center", alignItems: 'center'}}>
                      <RoundImageButton
                        nav={(this.state.authLogin) ? "Settings" : "Login"}
                        titlePage={"Pengaturan"}
                        navigation={navigation}
                        roundImageText={"Pengaturan"}
                        roundImageSource={require("../../../assets/icon/setting.png")}
                      />
                  </Col>
                </Grid>
              </View>

              {(!this.state.authLogin) &&
                <View style={{ padding: 10 }}>
                  <Button
                    primary
                    block
                    rounded
                    onPress={() => this.infoRegister() }
                  >
                    <Icon type="SimpleLineIcons" active name="note" style={{ marginRight: 10, fontSize: 14}} />
                    <Text style={{ color: '#fff' }}> Registrasi </Text>
                  </Button>
                  <Button
                    style={{ marginTop: 10 }}
                    primary
                    block
                    rounded
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Icon type="SimpleLineIcons" active name="login" style={{ marginRight: 10, fontSize: 14}} />
                    <Text style={{ color: '#fff' }}> Sign In </Text>
                  </Button>
                </View>
              }

              {(this.state.authLogin) &&
                <View style={{ padding: 10 }}>
                  <Button
                    primary
                    block
                    rounded
                    onPress={() => this.logout() }
                  >
                    <Icon type="SimpleLineIcons" active name="note" style={{ marginRight: 10, fontSize: 14}} />
                    <Text style={{ color: '#fff' }}> Sign Out </Text>
                  </Button>
                </View>
              }
            </Content>
          </ImageBackground>
          {/*<MyFooter navigation={navigation} selected={"home"} />*/}
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.homeReducer.items,
  news: state.homeReducer.news,
  hasErrored: state.homeReducer.hasErrored,
  isLoading: state.homeReducer.isLoading,
});
export default connect(mapStateToProps, bindAction)(HomePage);
