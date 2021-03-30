import React, { Component } from "react";
import {
  Container,
  Text,
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
  Grid,
  Col,
  Row,
  Left,
  Right,
  Body,
  Spinner
} from "native-base";
import {
  Image,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Style from "./style.js";
import { connect } from "react-redux";
import StyleHeader from "../CommonComponents/Header/style.js";
import ThemeHeader from "../CommonComponents/Header/index.js";
import NotifyContent from "../CommonComponents/NotifyContent";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData, itemsRemove } from "../../actions/listnews";
import MyFooter from "../CommonComponents/Footer";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

class ListNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      total: 1,
      loadingMore: false
    };
  }

  componentWillMount(){
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const url = params.url + '&page=' + this.state.page;
    this.props.itemsRemove([]);
    this.props.loading(true);
    this.props.fetchData(url); 
  }

  _handleLoadMore = () => {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const total = params.count;
    const { page } = this.state;
    var count = total/10;
    if(page < count){
      this.props.itemsIsModal(true);
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1,
          loadingMore: true
        }),
        () => {
          
          const url = params.url + '&page=' + this.state.page;
          this.props.fetchData(url); 
          // this.setState({ loadingMore: false });
        }
      );
    }
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

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

  render() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const titlePage = params.titlePage;
    const url = params.url;
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
          <ThemeHeader 
            PageTitle={titlePage}
            IconLeft="arrow-back"
            navigation={navigation} />
          <Content
            style={{ marginBottom: null }}
            onScroll={({ nativeEvent }) => {
              if (this.isCloseToBottom(nativeEvent)) {
                this._handleLoadMore();
              }
            }}
          >
          <View style={{ padding: 5 }}>
            {this.props.items.length > 0 ?
              <List
                style={{ backgroundColor: '#fff'}}
                bounces={false}
                dataArray={this.props.items}
                keyExtractor = { (item, index) => index.toString() }
                renderRow={item =>
                  <ListItem 
                    style={{marginLeft: 0}}
                    thumbnail 
                    onPress={() => navigation.navigate("DetailNews", {
                        titlePage: 'BERITA TERKINI',
                        title: item.title.rendered,
                        image: item._embedded['wp:featuredmedia']['0'].source_url,
                        description: item.content.rendered.replace(/(<([^>]+)>)/ig, ''),
                        url: item._links.self['0'].href,
                        time: this.getParsedDate(item.date),
                        author: this.Capitalize(item._embedded.author['0'].name),
                        link:item.link
                    })}>
                    <Left>
                      <Image style={Style.image} source={{uri: item._embedded['wp:featuredmedia']['0'].source_url}} />
                    </Left>
                    <Body>
                      <Text style={Style.textMuted}>{item.title.rendered}</Text>
                      <Text note numberOfLines={1}>{item.excerpt.rendered.replace(/(<([^>]+)>)/ig, '')}</Text>
                    </Body>
                  </ListItem>
                }
              />
              : <View style={{ padding: 10 }}>
                <Text style={Style.textMutedLight}>Tidak Ada Data</Text>
              </View>
            }

            {this.props.isModal &&
              <Spinner/>
            }
          </View>
          </Content>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: (url) => dispatch(fetchData(url)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    itemsRemove: bol => dispatch(itemsRemove(bol)),
  };
}

const mapStateToProps = state => ({
  hasErrored: state.listNewsReducer.hasErrored,
  isLoading: state.listNewsReducer.isLoading,
  isModal: state.listNewsReducer.isModal,
  items: state.listNewsReducer.items
});
export default connect(mapStateToProps, bindAction)(ListNews);
