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
  Textarea
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
import Root from '../../../root/Url';
import { connect } from "react-redux";
import { StackActions, NavigationActions } from 'react-navigation';
import ThemeHeader from "../../CommonComponents/Header/index.js";
import { fetchData, itemsRemove } from "../../../actions/konsultasi";

class AddKonsultasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      description: '',
      screen: false,
      loading: false
    };
  }

  componentWillMount(){

  }

  updateData(){    
    this.setState({loading:true});
    let name = this.state.name;
    let email = this.state.email;
    let description = this.state.description;

    fetch(Root.link + 'konsultasi/create', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json', 
        'Content-Type' : 'application/json',
        // 'Authorization' : 'Bearer ' + global.access_token
      },
      body: JSON.stringify({
        'email' : email,
        'judul' : name,
        'keterangan' : description
      }),
    })
    .then(response => response.json())
    .then((responseJson) => {
      this.setState({loading:false});
      // console.warn(JSON.stringify(responseJson));
      try{
        if(responseJson.success){
          var json = responseJson.data;
          this.props.itemsRemove();
          this.props.fetchData();
          this.props.navigation.navigate('HomePage');
          var msg = "Berhasil Mengirimkan Saran";
          Toast.show({
            text: msg,
            duration: 2500,
            position: "bottom",
            style:{ backgroundColor: '#00a357' },
            textStyle: { textAlign: "center", color: '#FFF', padding: 10 }
          });
        }else{
          var errors = responseJson.errors;
          var mname = '';
          var memail = '';
          var mdescription = '';

          if(errors.judul){
            mname = errors.judul[0] + "\n";
          }

          if(errors.email){
            memail = errors.email[0] + "\n";
          }

          if(errors.keterangan){
            mdescription = errors.keterangan[0];
          }

          var msg = memail + " " + mname + " " + mdescription;
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
        this.setState({loading:false});
      }
    }).catch(function(err) {
        this.setState({loading:false});
        console.log(err.message + " Error");
    }).done();
  }

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
          <ThemeHeader
            PageTitle="SARAN"
            IconLeft="arrow-back"
            navigation={navigation}
          />
          <Content
            style={{ backgroundColor: "transparent", padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <Form>
              <Item underline style={{ marginLeft: 0 }}>
                <Input
                  ref={c => (this.textInput = c)}
                  onChangeText={text => this.setState({email:text})}
                  value={this.state.email}
                  autoComplete="off"
                  placeholder="Email" />
              </Item>
              <Item underline style={{ marginLeft: 0 }}>
                <Input
                  ref={c => (this.textInput = c)}
                  onChangeText={text => this.setState({name:text})}
                  value={this.state.name}
                  autoComplete="off"
                  placeholder="Judul" />
              </Item>
              <Item underline style={{ marginLeft: 0 }}>
                  <Textarea 
                    style={{ width: '100%' }}
                    rowSpan={5} 
                    ref={c => (this.textInput = c)}
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    placeholder="Keterangan" />
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
          </Content>
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
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(fetchData(bol)),
    itemsRemove: bol => dispatch(itemsRemove(bol))
  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(AddKonsultasi);