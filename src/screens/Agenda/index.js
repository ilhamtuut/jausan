import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Modal,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert
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
  ListView,
  ListItem,
  Left,
  Right,
  Body,
  Spinner
} from "native-base";
import Root from '../../root/Url';
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import { Agenda, CalendarList, Calendar, LocaleConfig } from 'react-native-calendars';
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

class Agendas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: Date(),
      agenda: [],
      loading: true
    };
  }

  componentWillMount(){
    this.get_data();
  }

  get_data(){
    fetch(Root.link + 'agenda', {
        method: 'GET',
        headers: {
          'Accept' : 'application/json', 
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then((responseJson) => {
        // console.warn(JSON.stringify(responseJson))
        try{
          var obj = responseJson;
          if(obj.success){
            this.setState({
              agenda: obj.data.data,
              loading: false,
            });
          }
        }catch(err){
          console.log(err.message + " Error");
        }
      }).catch(function(err) {
          console.log(err.message + " Error");
      }).done();
  }

  onDayPress = (day) => {
    this.setState({selected: day.dateString});
  }

  actionButton(){

  }

  getParsedDate(strDate){
    var date = new Date(strDate);
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

  render() {
    const navigation = this.props.navigation;
    var mark = {[this.state.selected]: {
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
              }};

    this.state.agenda.forEach(item => {
        mark[item.tanggal_pelaksanaan] = {
          selected: true, 
          marked: true,
          customStyles: {
            container: {
              backgroundColor: '#f68002'
            },
            text: {
              color: 'white'
            }
          }
        };
    });

    return (
      <Container>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.loading}
          onRequestClose={() => {
            this.setState({loading: false})
          }}>
          <View style={Style.spinnerBackground}>
            <Spinner style={Style.spinnerStyle}/>
          </View>
        </Modal>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
          <ThemeHeader
            PageTitle="AGENDA"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: "transparent", marginBottom: 30 }}
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
                markedDates={mark}
              />
              <Text style={Style.text}>Daftar Agenda</Text>
              { (this.state.agenda.length) ?
                <List style={{ backgroundColor: '#fff', marginBottom: 20 }}>
                  {
                    this.state.agenda.map((item, index) => (
                      <ListItem 
                        key={index}
                        avatar
                        onPress={() => this.actionButton() }
                        >
                        <Body style={{ marginLeft: 0 }}>
                          <Text style={{ color: '#f68002' }}>{ item.name }</Text>
                          <Text note numberOfLines={1}>{ item.keterangan }</Text>
                        </Body>
                        <Right>
                          <Text note>{ this.getParsedDate(item.tgl_acara) }</Text>
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
                : <ListItem avatar style={{ backgroundColor: '#fff', marginLeft: 0 }}>
                  <Body style={{ marginLeft: 0 }}>
                    <Text style={{ color: '#555', fontSize: 12, textAlign: 'center' }}>Tidak Ada Agenda</Text>
                  </Body>
                </ListItem>
              }
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {

  };
}

const mapStateToProps = state => ({

});
export default connect(mapStateToProps, bindAction)(Agendas);
