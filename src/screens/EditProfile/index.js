import React, { Component } from "react";
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
  Toast,
  Spinner,
  Grid,
  Col,
  Thumbnail,
  Left,
} from "native-base";
import {
  Image,
  Dimensions,
  StyleSheet,
  AsyncStorage,
  View,
  Modal,
  TouchableOpacity,
  Platform
} from "react-native";
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import { StackActions, NavigationActions } from 'react-navigation';
import { itemsFetchDataEditProfile, itemsIsLoadingEditProfile } from "../../actions/editprofile";
import ThemeHeader from "../CommonComponents/Header/index.js";
import ImagePicker from 'react-native-image-picker';
const profile = require("../../../assets/user.png");
const goLogin = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'HomePage' })],
});
class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nik: '',
      name: '',
      alamat: '',
      phone_number: '',
      image: '',
      view_image: '',
      photo_diri: '',
      screen: false,
      loading: false,
      valid: true
    };
  }

  componentWillMount(){
    this.getData();
  }

  getData(){
    const navigation = this.props.navigation;
    const params = navigation.state.params.params;
    this.setState({ 
      nik: params.nik, 
      name: params.name, 
      phone_number: params.telepon, 
      alamat: params.alamat, 
      image: params.photo_diri,
      screen:false, 
    });
  }

  updateData(){
    this.setState({loading:true});

    var params = {
      nik: this.state.nik,
      name: this.state.name,
      telepon: this.state.phone_number,
      alamat: this.state.alamat,
    }

    fetch(Root.link + 'update_profil', {
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
      this.setState({loading:true});
      // console.warn(JSON.stringify(responseJson));
      try{
        if(responseJson.success){
          this.props.navigation.dispatch(goLogin);
          Toast.show({
            text: "Berhasil Memperbaharui Profile",
            duration: 2500,
            position: "bottom",
            style:{ backgroundColor: '#f68002' },
            textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
          });
        }else{
          var errors = responseJson.errors;
          var mnik = '';
          var mname = '';
          var mphone_number = '';
          var memail = '';

          if(errors.nik){
            mnik = errors.nik[0] + "\n";
          }

          if(errors.name){
            mname = errors.name[0] + "\n";
          }

          if(errors.telepon){
            mphone_number = errors.telepon[0] + "\n";
          }

          if(errors.alamat){
            memail = errors.alamat[0];
          }
          var msg = mnik + " " + mname + " " + mphone_number + " " + memail;
          Toast.show({
            text: msg,
            duration: 2500,
            position: "bottom",
            style:{ backgroundColor: '#d9534f' },
            textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
          });
        }
      }catch(err){
        console.log(err.message + " Error");
        this.setState({loading:true});
      }
    }).catch(function(err) {
        this.setState({loading:true});
        console.log(err.message + " Error");
    }).done();
    this.uploadFoto();
  }

  uploadFoto(){
    if(this.state.photo_diri){
      var params = {
        foto_diri: this.state.photo_diri,
      }

      fetch(Root.link + 'update_foto', {
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
        console.warn(JSON.stringify(responseJson))
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
    }
  }

  selectFile() {
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
        this.setState({
          view_image: source.uri,
          photo_diri: 'data:image/jpeg;base64,' + source.data,
        });
      }
    });
  };

  render() {
    const navigation = this.props.navigation;
    if (this.state.screen) {
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
          <ThemeHeader
            PageTitle="EDIT PROFIL"
            IconLeft="arrow-back"
            navigation={navigation}
          />
          <Content
            padder
            style={{ backgroundColor: "transparent", marginBottom: null }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 30 }}>
              <Grid style={{ marginBottom: 5, backgroundColor: '#fff' }}>
                <Col style={{ justifyContent: "center", alignItems: 'center' }}>
                  <View 
                    style={{ marginTop: 0, borderWidth: 2, backgroundColor: '#eee', borderColor: '#ddd', borderRadius: 200, height: 154, width: 154 }} 
                    >
                  <Thumbnail 
                    onError={() => this.setState({ valid : false }) }
                    style={{ borderRadius: 200, height: 150, width: 150 }} 
                    source={ (this.state.valid) ? { uri: (this.state.view_image)? this.state.view_image : this.state.image } : profile } />
                  </View>
                  <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button
                      small
                      primary
                      onPress={() => this.selectFile()}
                    >
                      <Icon 
                        type="FontAwesome5"
                        name="upload" style={Style.addIcon} />
                      <Text style={Style.postText}>Update Foto</Text>
                    </Button>
                  </View>
                </Col>
              </Grid>
              <Form>
                <Item stackedLabel style={{ marginLeft: 0 }}>
                  <Label>NIK</Label>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({nik:text})}
                    value={this.state.nik}
                    editable={false}
                    autoComplete="off"
                    placeholder="NIK" />
                </Item>
                <Item stackedLabel style={{ marginLeft: 0 }}>
                  <Label>Nama</Label>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({name:text})}
                    value={this.state.name}
                    placeholder="Nama" />
                </Item>
                <Item stackedLabel style={{ marginLeft: 0 }}>
                  <Label>Alamat</Label>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({alamat:text})}
                    value={this.state.alamat}
                    placeholder="Alamat" />
                </Item>
                <Item stackedLabel style={{ marginLeft: 0 }}>
                  <Label>Nomor Telepon</Label>
                  <Input
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({phone_number:text})}
                    value={this.state.phone_number}
                    keyboardType="numeric"
                    placeholder="Nomor Telepon" />
                </Item>
                <Button
                  bordered
                  primary
                  rounded
                  block
                  onPress={() => this.updateData()}
                  style={{ marginTop: 30 }}
                >
                  <Text> Submit </Text>
                </Button>
              </Form>
            </View>
          </Content>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(itemsFetchDataEditProfile(bol)),
    loading: bol => dispatch(itemsIsLoadingEditProfile(bol)),
  };
}

const mapStateToProps = state => ({
  hasErrored: state.editProfileReducer.hasErrored,
  isLoading: state.editProfileReducer.isLoading,
  items: state.editProfileReducer.items
});

export default connect(mapStateToProps, bindAction)(EditProfile);