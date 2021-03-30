import React, { Component } from "react";
import {
  Container,
  Text,
  Header,
  Title,
  Content,
  Button,
  Input,
  Icon,
  Card,
  CardItem,
  Badge,
  List,
  ListView,
  ListItem,
  Left,
  Right,
  Body,
  Grid,
  Col,
  Item,
  Toast,
  Spinner
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import moment from 'moment'; 
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import MyFooter from "../CommonComponents/Footer";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker";
import { itemsFetchData, itemsIsLoading } from "../../actions/jadwal";
import { Agenda, CalendarList, Calendar, LocaleConfig } from 'react-native-calendars';
import GetLocation from 'react-native-get-location';
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

LocaleConfig.locales['id'] = {
  monthNames: ['Januari','Febuari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agust','Sept','Oct','Nov','Dec'],
  dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
  dayNamesShort: ['Ming','Sen','Sel','Rab','Kam','Jum','Sab'],
  today: 'Hari Ini'
};
LocaleConfig.defaultLocale = 'id';

class Jadwal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: Date(),
      location: null,
      loadingAction: false,
      isModal: false,
      city: 'Jepara',
      data: {},
    };
  }

  componentWillMount(){
    var currentDate = this.getParsedDateLocal(Date());
    this.get_jadwal(currentDate);
  }

  onDayPress = (day) => {
    var currentDate = this.getParsedDateLocal(Date());
    this.get_jadwal(day.dateString);
    this.setState({selected: day.dateString});
  }

  getParsedDateLocal(strDate){
    var date = new Date(strDate);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    date =  yyyy + "-" + mm + "-" + dd;
    return date.toString();
  }

  getParsedDate(strDate){
    var date = new Date(strDate);
    // alert(date);
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var m = '';

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

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

  _requestLocation = () => {
    this.setState({ loadingAction: true, location: null });

    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 150000,
    })
    .then(location => {
        console.warn(JSON.stringify(location));
        this.setState({
            location: location,
            loadingAction: false,
        });
    })
    .catch(ex => {
        const { code, message } = ex;
        // console.warn(code, message);
        if (code === 'CANCELLED') {
            Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
            Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
            Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
            Alert.alert('Authorization denied');
        }
        this.setState({
            location: null,
            loading: false,
        });
    });
  }

  get_jadwal(date){
    this.setState({isModal: true});

    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/715/tanggal/' + date, {
      method: 'GET',
      headers: {
        'Accept' : 'application/json'
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
        this.setState({
            data: responseJson.jadwal.data,
            isModal: false
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModal}
          onRequestClose={() => {
            this.setState({isModal: true})
          }}>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Modal>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
        <ThemeHeader
            PageTitle="Jadwal Sholat"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
        <Content
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "transparent", marginBottom: null }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <Calendar
            style={Style.calendar}
            onDayPress={this.onDayPress}
            theme={{
              arrowColor: '#f68002',
              selectedDayBackgroundColor: '#f68002',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#f68002'
            }}
            markingType={'custom'}
            markedDates={{
              [this.state.selected]: {
                selected: true, 
                disableTouchEvent: false, 
                selectedDotColor: 'orange',
                customStyles: {
                  container: {
                    backgroundColor: '#f68002'
                  },
                  text: {
                    color: 'white'
                  }
                }
              }
            }}
          />

          {/*<View style={{ padding: 10 }}>
            <Button
              disabled={this.state.loadingAction}
              primary
              block
              rounded
              onPress={this._requestLocation}
            >
              <Icon type="SimpleLineIcons" active name="map" style={{ marginRight: 10, fontSize: 14}} />
              <Text style={{ color: '#fff' }}> Lokasi </Text>
            </Button>
          </View>

          {this.state.loadingAction ? (
              <ActivityIndicator />
          ) : <Text style={Style.viewText}>
            <Icon active name="md-pin" style={{ color: 'green', marginRight: 10, fontSize: 14}} />
            <Text style={{ color: 'green' }}>{ this.state.city }</Text>
          </Text> }*/}

          {this.state.data ? <Text style={Style.text}>{this.state.data.tanggal}</Text> : null}
          <List style={{ backgroundColor: '#fff', marginBottom: 20 }}>
            <ListItem>
              <Left>
                <Text>Imsak</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.imsak}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Subuh</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.subuh}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Terbit</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.terbit}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dhuha</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.dhuha}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Dzuhur</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.dzuhur}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Ashar</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.ashar}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Magrib</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.maghrib}</Text> : null}
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text>Isya</Text>
              </Left>
              <Right>
                {this.state.data ? <Text style={{ color: '#f68002' }}>{this.state.data.isya}</Text> : null}
              </Right>
            </ListItem>
          </List>
        </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(itemsFetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol))
  };
}

const mapStateToProps = state => ({
  hasErrored: state.jadwalReducer.hasErrored,
  isModalView: state.jadwalReducer.isModalView,
  isLoading: state.jadwalReducer.isLoading,
  items: state.jadwalReducer.items
});
export default connect(mapStateToProps, bindAction)(Jadwal);
