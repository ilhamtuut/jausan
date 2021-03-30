import React, { Component } from "react";
import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  Modal,
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
  Spinner,
  Fab,
  Picker,
  Toast,
  Textarea
} from "native-base";
import moment from 'moment'; 
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import ThemeHeader from "../CommonComponents/Header/index.js";
import DateTimePicker from "react-native-modal-datetime-picker";
import { register, itemsIsLoadingFormulir } from "../../actions/formulir";
import { StackActions, NavigationActions } from 'react-navigation';
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
const bg = require("../../../assets/bg-transparent.png");
const goLogin = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
class Formulir extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingView: true,
      loading: false,
      modalVisible: false,
      DateTimePickerVisible: false,
      nik:'',
      name:'',
      utusan:'',
      tgl_lahir:'',
      tinggi_badan:'',
      berat_badan: '',
      pekerjaan: '',
      status_perkawinan:'',
      golongan_darah: '',
      formal: '',
      non_formal: '',
      status: 0,
      dataUtusan: []
    };
  }

  componentWillMount(){
    this.get_cabang();
    this.get_data();
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

  registerEvent(){
    var params = {
      utusan: this.state.utusan,
      ttl: this.state.tgl_lahir,
      tinggi: this.state.tinggi_badan,
      berat_badan: this.state.berat_badan,
      pekerjaan: this.state.pekerjaan,
      status_pernikahan: this.state.status_perkawinan,
      gol_darah: this.state.golongan_darah,
      pendidikan_formal: this.state.formal,
      pendidikan_non_formal: this.state.non_formal,
      status: this.state.status
    }

    if(this.state.utusan != '' && 
        this.state.tgl_lahir != '' && 
        this.state.tinggi_badan != '' && 
        this.state.berat_badan != '' && 
        this.state.pekerjaan != '' && 
        this.state.formal != '' && 
        this.state.non_formal != '' && 
        this.state.status_perkawinan != '' && 
        this.state.golongan_darah != '') {
      this.sendEvent(params);
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

  sendEvent(params){
    this.setState({loading:true});
    const navigation = this.props.navigation;
    const id = this.props.navigation.state.params.params.id;
    fetch(Root.link + 'event_register/' + id, {
      method: 'POST',
      headers: {
        'Accept' : 'application/json', 
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + global.access_token
      },
      body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({loading:false});
      // console.warn(JSON.stringify(responseJson));
      try{
        if(responseJson.success){
          var json = responseJson.data;
          this.props.navigation.goBack();
          var msg = "Berhasil Registrasi";
          Toast.show({
            text: msg,
            duration: 2500,
            position: "bottom",
            style:{ backgroundColor: '#f68002' },
            textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
          });
        }else{
          if(responseJson.message == 'failed'){
            this.props.navigation.goBack();
            Toast.show({
              text: 'Anda Sudah Registrasi Kegiatan Ini.',
              duration: 2500,
              position: "bottom",
              style:{ backgroundColor: '#d9534f' },
              textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
            });
          }else{
            if(responseJson.errors){
              var errors = responseJson.errors;
              var mutusan = '';
              var mttl = '';
              var mtinggi = '';
              var mberat_badan = '';
              var mpekerjaan = '';
              var mstatus_pernikahan = '';
              var mgol_darah = '';
              var mcabang_id = '';
              var mpassword = '';

              if(errors.utusan){
                mutusan = errors.utusan[0] + "\n";
              }

              if(errors.ttl){
                mttl = errors.ttl[0] + "\n";
              }

              if(errors.tinggi){
                mtinggi = errors.tinggi[0] + "\n";
              }

              if(errors.berat_badan){
                mberat_badan = errors.berat_badan[0] + "\n";
              }

              if(errors.pekerjaan){
                mpekerjaan = errors.pekerjaan[0] + "\n";
              }

              if(errors.status_pernikahan){
                mstatus_pernikahan = errors.status_pernikahan[0] + "\n";
              }

              if(errors.gol_darah){
                mgol_darah = errors.gol_darah[0] + "\n";
              }

              var msg = mutusan + " " + mttl + " " + mtinggi + " " + mberat_badan + " " + mpekerjaan + " " + mstatus_pernikahan + " " + mgol_darah;
              Toast.show({
                text: msg,
                duration: 2500,
                position: "bottom",
                style:{ backgroundColor: '#d9534f' },
                textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
              });
            }else{
              this.props.navigation.dispatch(goLogin);
              AsyncStorage.clear();
            }
          }
        }
      }catch(err){
        console.log(err.message + " Error");
        this.setState({loading:false});
      }
    }).catch(function(err) {
        this.setState({loading:false});
        console.log(err.message + " Error");
    }).done();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onValueChange(value: string) {
    this.setState({
      status_perkawinan: value
    });
  }

  onValueChangeGol(value: string) {
    this.setState({
      golongan_darah: value
    });
  }

  onValueChangeUtusan(value: string) {
    this.setState({
      utusan: value
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
              dataUtusan: obj.data
            });
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
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
            nik: obj.data.nik,
            name: obj.data.name,
            loadingView: false
          });
        }else{
          this.props.navigation.dispatch(goLogin);
          AsyncStorage.clear();
          this.setState({loading: false});
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
    const params = this.props.navigation.state.params.params;
    if (this.state.loadingView) {
      return (
        <Container>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Container>);
    } else {
      return (
        <Container>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.loading}
            onRequestClose={() => {
              this.setState({loading:false})
            }}>
            <View style={Style.spinnerBackground}>
              <Spinner style={Style.spinnerStyle}/>
            </View>
          </Modal>
          <ImageBackground source={bg} style={Style.backgroundImageLogin}>
            <ThemeHeader
              PageTitle="Formulir Pendaftaran Kegiatan"
              IconLeft="arrow-back"
              route="homepage"
              navigation={navigation}
            />
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "transparent", marginBottom: 30, padding: 5 }}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              <Card style={{ justifyContent: "center", alignItems: 'center', borderRadius: 5, padding: 15 }}>
                <View style={{ width: deviceWidth - 50, justifyContent: "center", alignItems: 'center' }}>
                  <Text style={{ color: "#575757", marginBottom: 10 }}>{ params.name }</Text>
                  <Item>
                    <Input
                      ref={c => (this.textInput = c)}
                      value={this.state.nik}
                      keyboardType="number-pad"
                      placeholder={"NIK"}
                      editable={false}
                      maxLength={16}
                      secureTextEntry={false}
                    />
                  </Item>
                  <Item>
                    <Input
                      ref={c => (this.textInput = c)}
                      value={this.state.name}
                      placeholder={"Nama"}
                      editable={false}
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
                      onChangeText={text => this.setState({pekerjaan:text})}
                      placeholder={"Pekerjaan"}
                      secureTextEntry={false}
                    />
                  </Item>
                  <Item>
                    <Input
                      ref={c => (this.textInput = c)}
                      keyboardType="number-pad"
                      onChangeText={text => this.setState({tinggi_badan:text})}
                      placeholder={"Tinggi Badan"}
                      secureTextEntry={false}
                    />
                  </Item>
                  <Item>
                    <Input
                      ref={c => (this.textInput = c)}
                      keyboardType="number-pad"
                      onChangeText={text => this.setState({berat_badan:text})}
                      placeholder={"Berat Badan"}
                      secureTextEntry={false}
                    />
                  </Item>
                  <Item>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: '100%' }}
                      selectedValue={this.state.utusan}
                      onValueChange={this.onValueChangeUtusan.bind(this)}
                    >
                      <Picker.Item label="Pilih Utusan" value="" />
                      {
                        this.state.dataUtusan.map((item, index) => (
                          <Picker.Item key={index} label={item.name} value={item.id} />
                        ))
                      }
                    </Picker>
                  </Item>
                  <Item>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Pilih Golongan Darah"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: '100%' }}
                      selectedValue={this.state.golongan_darah}
                      onValueChange={this.onValueChangeGol.bind(this)}
                    >
                      <Picker.Item label="Pilih Golongan Darah" value="" />
                      <Picker.Item label="A" value="A" />
                      <Picker.Item label="B" value="B" />
                      <Picker.Item label="O" value="O" />
                      <Picker.Item label="AB" value="AB" />
                    </Picker>
                  </Item>

                  <Item>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      placeholder="Pilih Status"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#007aff"
                      style={{ width: '100%' }}
                      selectedValue={this.state.status_perkawinan}
                      onValueChange={this.onValueChange.bind(this)}
                    >
                      <Picker.Item label="Pilih Status" value="" />
                      <Picker.Item label="Menikah" value="Menikah" />
                      <Picker.Item label="Belum Menikah" value="Belum Menikah" />
                    </Picker>
                  </Item>

                  <Item underline style={{ marginLeft: 0 }}>
                    <Textarea 
                      style={{ width: '100%', paddingLeft: 5 }}
                      rowSpan={5} 
                      ref={c => (this.textInput = c)}
                      onChangeText={text => this.setState({formal:text})}
                      value={this.state.formal}
                      placeholder="Pendidikan Formal" />
                  </Item>

                  <Item underline style={{ marginLeft: 0 }}>
                    <Textarea 
                      style={{ width: '100%', paddingLeft: 5 }}
                      rowSpan={5} 
                      ref={c => (this.textInput = c)}
                      onChangeText={text => this.setState({non_formal:text})}
                      value={this.state.non_formal}
                      placeholder="Pendidikan Non Formal" />
                  </Item>

                  <Button
                    primary
                    block
                    style={{ marginTop: 10 }}
                    onPress={() => this.registerEvent()}
                  >
                    <Text> Submit </Text>
                  </Button>
                </View>
              </Card>
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
}

function mapDispatchToProps(dispatch) {
  return {
    register: (params) => dispatch(register(params)),
    itemsIsLoading: bol => dispatch(itemsIsLoadingFormulir(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredFormulir: state.formulirReducer.hasErroredFormulir,
  isLoadingFormulir: state.formulirReducer.isLoadingFormulir,
  dataFormulir: state.formulirReducer.dataFormulir
});
export default connect(mapStateToProps, mapDispatchToProps)(Formulir);
