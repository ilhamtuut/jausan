import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Alert,
  Modal,
  Dimensions,
  TouchableOpacity,
  BackHandler
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
  Text,
  Icon,
  Card,
  CardItem,
  Label,
  Form,
  Item,
  Toast,
  Spinner
} from "native-base";
import ThemeHeader from "../CommonComponents/Header/index.js";
import Style from "./style.js";
import { itemsFetchData, itemsIsLoading, spinnerIsLogin } from "../../actions/login";
import { connect } from "react-redux";
import Root from '../../root/Url';
import { StackActions, NavigationActions } from 'react-navigation';
const bg = require("../../../assets/bg-transparent.png");

const goMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});

class Login extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      showPassword: true,
      showIcon: 'md-eye-off',
      errorEmail: false,
    };
    this.showPassword = this.showPassword.bind(this)
    // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    // BackHandler.exitApp();
    // this.props.navigation.dispatch(goMain);
  }

  showPassword() {
    var icon = "md-eye-off";
    if(this.state.showIcon == "md-eye-off"){
      icon = "md-eye";
    }
    this.setState({ 
      showPassword: !this.state.showPassword,
      showIcon: icon
    });
  }

  validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({ email: text, errorEmail: true });
      return false;
    }else {
      this.setState({ email: text, errorEmail: false });
    }
  }

  actionLogin() {
    let email = this.state.email;
    let password = this.state.password;
    if (email != "" && password != "") {
      this.props.spinloading(true);
      this.login(email,password);

    } else {
      // console.warn('Username atau kata sandi kosong!');
      Toast.show({
        text: "Isian masih kosong!",
        duration: 2500,
        position: "top",
        style:{ backgroundColor: '#d9534f' },
        textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
      });
    }
  }

  login(email,password){
    fetch(Root.link + 'login', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json', 
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        'username' : email,
        'password' : password
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      try{
        // console.warn(JSON.stringify(responseJson));
        var obj = responseJson;
        if(obj.token_type == "Bearer"){
          var data = {
            token_type : obj.token_type,
            access_token : obj.access_token,
            refresh_token : obj.refresh_token
          }
          AsyncStorage.setItem('session_user',JSON.stringify(data));
          global.access_token = obj.access_token;
          this.props.navigation.dispatch(goMain);
          this.fetchData(data);
        }else{
          this.props.loading(false);
          this.props.spinloading(false);
          if(obj.message == "Silahkan Tunggu Konfirmasi Admin"){
            Toast.show({
              text: "Silahkan Tunggu Konfirmasi Admin",
              duration: 2500,
              position: "top",
              style:{ backgroundColor: '#00a357' },
              textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
            });
          }else{
            Toast.show({
              text: "Email atau kata sandi salah!",
              duration: 2500,
              position: "top",
              style:{ backgroundColor: '#d9534f' },
              textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
            });
          }
        }
      }catch(err){
        console.log(err.message + " Error");
        this.props.loading(false);
        this.props.spinloading(false);
      }
    }).catch(function(err) {
        this.props.loading(false);
        this.props.spinloading(false);
        console.log(err.message + " Error");
    }).done();
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

  showMessage(){
    Alert.alert(
      'Lupa Password',
      'Silahkan kirim email ke ansorjepara51@gmail.com dengan menyertakan nama lengkap, foto ktp, dan foto selfi dengan menunjukkan ktp, proses ini akan memakan waktu 1-7 hari, Silahkan menunggu.',
      [
        {text: 'Keluar', style: 'cancel'},
      ],
      {cancelable: false},
    );
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.isSpinLogin}
          onRequestClose={() => {
            this.props.spinloading(true)
          }}>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Modal>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <Content
            padder
            style={{ backgroundColor: "#fff", marginBottom: null, flex: 1}}
            bounces={false}
          >
            <View
              style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}
              >
              <Image
                source={require("../../../assets/logo.png")}
                style={Style.backgroundImage}
              />
            </View>
            <View style={{ marginTop: 20, paddingLeft: 10, paddingRight: 10, marginLeft: 10, marginRight: 10, borderRadius: 5 }}>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    autoCompleteType="email"
                    onChangeText={text => this.validate(text)}
                    placeholder={"Email"}
                    autoCapitalize = "none"
                    secureTextEntry={false}
                  />
                  {this.state.errorEmail &&
                    <Text style={{ color: '#d9534f', fontSize: 12 }}>Email salah</Text>
                  }
                </Item>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({password:text})}
                    placeholder={"Kata Sandi"}
                    secureTextEntry={this.state.showPassword}
                  />
                  <TouchableOpacity onPress={this.showPassword}>
                    <Icon
                      active
                      name={this.state.showIcon}
                      style={{ color: "#575757", marginRight: 5 }}
                    />
                  </TouchableOpacity>
                </Item>
                <View style={{ marginTop: 15, marginBottom: 15 }}>
                  <Button
                    primary
                    block
                    onPress={() => this.actionLogin()}
                  >
                    <Text> MASUK </Text>
                  </Button>
                </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.infoRegister() }>
                <Text style={{ textAlign: 'center', color: '#f68002', fontSize: 15, marginTop: 5 }}> Registrasi </Text>
              </TouchableOpacity>
              {/*<TouchableOpacity onPress={() => this.showMessage() }>
                <Text style={{ textAlign: 'center', color: '#f68002', fontSize: 15, marginTop: 5 }}> Lupa Kata Sandi </Text>
              </TouchableOpacity>*/}
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(itemsFetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    spinloading: bol => dispatch(spinnerIsLogin(bol))
  };
}

const mapStateToProps = state => ({
  hasErrored: state.loginReducer.hasErrored,
  isLoading: state.loginReducer.isLoading,
  isLogin: state.loginReducer.isLogin,
  isSpinLogin: state.loginReducer.isSpinLogin
});
export default connect(mapStateToProps, bindAction)(Login);
