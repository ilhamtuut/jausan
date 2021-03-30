import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  RefreshControl,
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
  List,
  ListView,
  ListItem,
  Left,
  Right,
  Body,
  Spinner
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData,itemsRemove, isRefresh } from "../../actions/amaliyah";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
const bg = require("../../../assets/bg-transparent.png");

class Amaliyah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      refreshing: false,
      page:1
    };
  }

  componentWillMount(){
    this.props.loading(true);
    this.props.itemsRemove();    
    this.props.fetchData(this.state.page);    
  }

  _handleLoadMore = () => {
    const { page } = this.state;
    var total = this.props.totalData/this.props.perPage;
    if(page < total && this.props.totalData > 20){
      this.props.itemsIsModal(true);
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1
        }),
        () => {
          this.props.fetchData(this.state.page);
        }
      );
    }
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  _onRefresh = () => {
    this.props.isRefresh(true);
    this.props.itemsRemove();    
    this.props.fetchData(1); 
  }

  // string.toUpperCase()
  
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoadingAmaliyah) {
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
            <ThemeHeader
              PageTitle="Amaliyah"
              IconLeft="arrow-back"
              route="homepage"
              navigation={navigation}
            />
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "transparent", marginBottom: 30 }}
              contentContainerStyle={{ paddingBottom: 10 }}
              onScroll={({ nativeEvent }) => {
                if (this.isCloseToBottom(nativeEvent)) {
                  this._handleLoadMore();
                }
              }}
            >
              <ScrollView 
                style={{ height: 'auto', width: deviceWidth, flex: 1 }}
                refreshControl={
                <RefreshControl
                  refreshing={this.props.isRefreshAmaliyah}
                  onRefresh={this._onRefresh}
                />
              }
              >
                <List style={{ backgroundColor: '#fff' }}>
                  {
                    this.props.itemAmaliyah.map((item, index) => (
                      <ListItem 
                        key={index}
                        avatar
                        onPress={() => navigation.navigate('AmaliyahList',{
                          params: item
                        })}
                        >
                        <Body style={{ marginLeft: 0 }}>
                          <Text style={{ color: '#f68002' }}>{ this.Capitalize(item.name) }</Text>
                        </Body>
                      </ListItem>
                    ))
                  }
                </List>
                {!this.props.itemAmaliyah.length &&
                  <Body style={{ padding: 10, marginTop: 20 }}>
                    <Text note>Tidak Ada Data</Text>
                  </Body>
                }
                {this.props.isModalAmaliyah &&
                  <Spinner color="#f68002" />
                }
              </ScrollView>
            </Content>
          </ImageBackground>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(fetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    itemsRemove: bol => dispatch(itemsRemove(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    isRefresh: bol => dispatch(isRefresh(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredAmaliyah: state.amaliyahReducer.hasErroredAmaliyah,
  isLoadingAmaliyah: state.amaliyahReducer.isLoadingAmaliyah,
  isModalAmaliyah: state.amaliyahReducer.isModalAmaliyah,
  itemAmaliyah: state.amaliyahReducer.itemAmaliyah,
  perPage: state.amaliyahReducer.perPage,
  totalData: state.amaliyahReducer.totalData,
  isRefreshAmaliyah: state.amaliyahReducer.isRefreshAmaliyah
});
export default connect(mapStateToProps, bindAction)(Amaliyah);
