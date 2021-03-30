import React, { Component } from "react";
import {
  AppRegistry,
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
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
  Spinner,
  Picker
} from "native-base";
import moment from 'moment'; 
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ImagePicker from 'react-native-image-picker';
import ThemeHeader from "../CommonComponents/Header/index.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import { StackActions, NavigationActions } from 'react-navigation';
import { registerUser, itemsIsLoading } from "../../actions/register";
const bg = require("../../../assets/bg-transparent.png");
var deviceWidth = Dimensions.get("window").width;
const goMain = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
class Register extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      nik:'',
      name:'',
      address:'',
      phone_number:'',
      email:'',
      password:'',
      photo_ktp:'',
      photo_diri:'',
      cabang_id:'',
      view_ktp:'',
      view_diri:'',
      showPassword: true,
      showIcon: 'md-eye-off',
      errorEmail: false,
      tgl_lahir:'',
      loading: false,
      DateTimePickerVisible: false,
      cabang: []
    };
    this.showPassword = this.showPassword.bind(this)
  }

  componentWillMount(){
    this.get_cabang();
  }

  showDateTimePicker = () => {
    this.setState({ DateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ DateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    var currentDate = moment(date).format("DD-MM-YYYY");
    this.setState({tgl_lahir:currentDate});
    this.hideDateTimePicker();    
  };

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

  actionRegister() {
    var params = {
      nik: this.state.nik,
      name: this.state.name,
      ttl: this.state.tgl_lahir,
      alamat: this.state.address,
      telepon: this.state.phone_number,
      email: this.state.email,
      photo_diri: this.state.photo_diri,
      photo_ktp: this.state.photo_ktp,
      cabang_id: this.state.cabang_id,
      password: this.state.password,
      password_confirmation: this.state.password,
    }

    if(this.state.nik != '' && 
        this.state.name != '' && 
        this.state.tgl_lahir != '' && 
        this.state.address != '' && 
        this.state.phone_number != '' && 
        this.state.email != '' && 
        this.state.photo_diri != '' && 
        this.state.photo_ktp != '' && 
        this.state.cabang_id != '' && 
        this.state.password != '') {
      this.sendRegister(params);
    } else {
      Toast.show({
        text: "Isian Masih Kosong!",
        duration: 2500,
        position: "top",
        style:{ backgroundColor: '#d9534f' },
        textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
      });
    }
  }

  sendRegister(params){
    this.setState({
      loading: true
    });
    fetch(Root.link + 'register', {
        method: 'POST',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(params),
      })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false
        });
        try{
          var obj = responseJson;
          if(obj.token_type == "Bearer"){
            var data = {
              token_type : obj.token_type,
              access_token : obj.access_token,
              refresh_token : obj.refresh_token
            }
            AsyncStorage.setItem('session_user',JSON.stringify(data));
            global.access_token = obj.access_token;
            // console.warn(JSON.stringify(responseJson));
            this.props.navigation.dispatch(goMain);
          }else{
            if(responseJson.errors){
              var errors = responseJson.errors;
              var mnik = '';
              var mname = '';
              var malamat = '';
              var mtelepon = '';
              var memail = '';
              var mphoto_diri = '';
              var mphoto_ktp = '';
              var mcabang_id = '';
              var mpassword = '';

              if(errors.nik){
                mnik = errors.nik[0] + "\n";
              }

              if(errors.name){
                mname = errors.name[0] + "\n";
              }

              if(errors.alamat){
                malamat = errors.alamat[0] + "\n";
              }

              if(errors.telepon){
                mtelepon = errors.telepon[0] + "\n";
              }

              if(errors.email){
                memail = errors.email[0] + "\n";
              }

              if(errors.cabang_id){
                mcabang_id = errors.cabang_id[0] + "\n";
              }

              if(errors.photo_diri){
                mphoto_diri = errors.photo_diri[0] + "\n";
              }

              if(errors.photo_ktp){
                mphoto_ktp = errors.photo_ktp[0] + "\n";
              }

              if(errors.password){
                mpassword = errors.password[0];
              }

              var msg = mnik + " " + mname + " " + malamat + " " + mtelepon + " " + memail + " " + mcabang_id + " " + mphoto_diri + " " + mphoto_ktp + " " + mpassword;
              Toast.show({
                text: msg,
                duration: 2500,
                position: "bottom",
                style:{ backgroundColor: '#d9534f' },
                textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
              });
            }else{
              Toast.show({
                text: "Berhasil registrasi, Silahkan Tunggu Konfirmasi Admin",
                duration: 2500,
                position: "top",
                style:{ backgroundColor: '#00a357' },
                textStyle: { color: '#FFF', padding: 10 }
              });
              this.props.navigation.dispatch(goMain);

              // Toast.show({
              //   text: "Gagal Registrasi!",
              //   duration: 2500,
              //   position: "top",
              //   style:{ backgroundColor: '#d9534f' },
              //   textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
              // });
            }
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
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

  selectFile(type) {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res;
        if(type == 'ktp'){
          this.setState({
            view_ktp: source.uri,
            photo_ktp: 'data:image/jpeg;base64,' + source.data,
          });
        }else{
          this.setState({
            view_diri: source.uri,
            photo_diri: 'data:image/jpeg;base64,' + source.data,
          });
        }
      }
    });
  };

  onValueChange(value: string) {
    this.setState({
      cabang_id: value
    });
  }

  get_cabang(){
    fetch(Root.link + 'cabang', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then((responseJson) => {
        try{
          var obj = responseJson;
          if(obj.success){
            this.setState({
              cabang: obj.data
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
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.loading}
          onRequestClose={() => {
            this.setState({
              loading: false
            });
          }}>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Modal>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <Content
            style={{ backgroundColor: "#fff", marginBottom: 0, padding: 10 }}
            bounces={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View
              style={{ alignItems: "center" }}
              >
              <Image
                source={require("../../../assets/logo.png")}
                style={Style.backgroundImage}
              />
              <Text style={{ color: '#f68002', fontWeight: 'bold', marginTop: 20 }}>PENDAFTARAN</Text>
            </View>
            <View style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10, borderRadius: 5, marginBottom: 50 }}>
              <View style={{ width: deviceWidth - 50, justifyContent: "center", alignItems: 'center' }}>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({nik:text})}
                    placeholder={"NIK"}
                    maxLength={16}
                    secureTextEntry={false}
                  />
                </Item>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({name:text})}
                    placeholder={"Nama"}
                    secureTextEntry={false}
                  />
                </Item>
                <Item 
                  onPress={this.showDateTimePicker}>
                  <Input 
                    editable={false}
                    onChangeText={(value) => this.setState({ tgl_lahir:value })}
                    value={this.state.tgl_lahir}
                    placeholder="Tanggal Lahir" />
                </Item>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    autoCompleteType="email"
                    onChangeText={(text) => this.validate(text)}
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
                    keyboardType="phone-pad"
                    onChangeText={text => this.setState({phone_number:text})}
                    placeholder={"Nomer Telepon"}
                    secureTextEntry={false}
                  />
                </Item>
                <Item>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({address:text})}
                    placeholder={"Alamat"}
                    secureTextEntry={false}
                  />
                </Item>
                <Item>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Pilih Provinsi"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: '100%' }}
                    selectedValue={this.state.cabang_id}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Picker.Item label="Pilih Provinsi" value="" />
                    {
                      this.state.cabang.map((item, index) => (
                        <Picker.Item key={index} label={item.name} value={item.id} />
                      ))
                    }
                  </Picker>
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
                <Image style={{ height: 100, width: 100, resizeMode: "cover", alignItems: "center", justifyContent: "center", marginTop: 10, marginBottom: 10 }} source={(this.state.view_diri) ? { uri: this.state.view_diri } : require("../../../assets/user.png")} />
                <Button
                  style={{ marginBottom: 10, marginTop: 10 }}
                  primary
                  small
                  block
                  onPress={() => this.selectFile('diri')}
                >
                  <Text> Lampirkan Foto Diri</Text>
                </Button>
                <Image style={{ height: 100, width: 150, resizeMode: "cover", alignItems: "center", justifyContent: "center", marginBottom: 10 }} source={(this.state.view_ktp) ? { uri: this.state.view_ktp } : require("../../../assets/card.png")} />
                <Button
                  style={{ marginBottom: 10 }}
                  primary
                  small
                  block
                  onPress={() => this.selectFile('ktp')}
                >
                  <Text> Lampirkan Foto KTP</Text>
                </Button>
                <Button
                  style={{ marginTop: 15, marginBottom: 15 }}
                  primary
                  block
                  onPress={() => this.actionRegister()}
                >
                  <Text> DAFTAR </Text>
                </Button>
              </View>
            </View>
            <DateTimePicker
              isVisible={this.state.DateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendRegister: (params) => dispatch(registerUser(params)),
    itemsIsLoading: bol => dispatch(itemsIsLoading(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredRegister: state.registerReducer.hasErroredRegister,
  isLoadingRegister: state.registerReducer.isLoadingRegister,
  itemsRegister: state.registerReducer.itemsRegister
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
