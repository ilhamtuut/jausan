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
  Spinner
} from "native-base";
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Platform
} from "react-native";
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import { itemsFetchData, itemsIsLoading } from "../../actions/password";
import ThemeHeader from "../CommonComponents/Header/index.js";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_password: '',
      new_password: '',
      confirm_password: '',
    };
  }

  updatePassword(){
    this.props.loading(true);
    let current_password = this.state.current_password;
    let new_password = this.state.new_password;
    let confirm_password = this.state.confirm_password;

    fetch(Root.link + 'update_password', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json', 
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer ' + global.access_token
      },
      body: JSON.stringify({
        'current_password' : current_password,
        'new_password' : new_password,
        'new_password_confirmation' : confirm_password
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
      this.props.loading(false);
      try{
        if(responseJson.success){
          var json = responseJson.data;
          Toast.show({
            text: "Berhasil Memperbaharui Kata Sandi",
            duration: 2500,
            position: "bottom",
            style:{ backgroundColor: '#f68002' },
            textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
          });
        }else{
          var errors = responseJson.errors;
          var msg = '';
          var current_password = '';
          var new_password = '';
          var confirm_password = '';
          if(errors != undefined){
            if(errors.current_password){
              current_password = errors.current_password[0] + "\n";
            }

            if(errors.new_password){
              new_password = errors.new_password[0] + "\n";
            }

            if(errors.new_password_confirmation){
              confirm_password = errors.new_password_confirmation[0];
            }
            msg = current_password + " " + new_password + " " + confirm_password;
          }else{
            msg = responseJson.message;
          }
          
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
        this.props.loading(false);
      }
    }).catch(function(err) {
        this.props.loading(false);
        console.log(err.message + " Error");
    }).done();
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ThemeHeader
          PageTitle="UBAH KATA SANDI"
          IconLeft="arrow-back"
          navigation={navigation}
        />
        <Content
          style={{ backgroundColor: "#fff", padding: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <Form style={{padding: 10}}>
            <Item underline style={{ marginLeft: 0 }}>
              <Input 
                ref={c => (this.textInput = c)}
                onChangeText={text => this.setState({current_password:text})}
                value={this.state.current_password}
                autoComplete="off"
                placeholder="Kata Sandi Lama" 
                secureTextEntry />
            </Item>
            <Item underline style={{ marginLeft: 0 }}>
              <Input 
                ref={c => (this.textInput = c)}
                onChangeText={text => this.setState({new_password:text})}
                value={this.state.new_password}
                autoComplete="off"
                placeholder="Kata Sandi Baru" 
                secureTextEntry />
            </Item>
            <Item underline style={{ marginLeft: 0 }}>
              <Input 
                ref={c => (this.textInput = c)}
                onChangeText={text => this.setState({confirm_password:text})}
                value={this.state.confirm_password}
                autoComplete="off"
                placeholder="Ketik Ulang Kata Sandi" 
                secureTextEntry />
            </Item>
            <Button
              bordered
              primary
              rounded
              block
              onPress={() => this.updatePassword()}
              style={{ marginTop: 30 }}
            >
              <Text> Submit </Text>
            </Button>
          </Form>
        </Content>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.isLoading}
            onRequestClose={() => {
              this.props.loading(false)
            }}>
            <View style={Style.spinnerBackground}>
              <Spinner style={Style.spinnerStyle}/>
            </View>
          </Modal>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(itemsFetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
  };
}

const mapStateToProps = state => ({
  hasErrored: state.passwordReducer.hasErrored,
  isLoading: state.passwordReducer.isLoading,
  items: state.passwordReducer.items
});

export default connect(mapStateToProps, bindAction)(ChangePassword);