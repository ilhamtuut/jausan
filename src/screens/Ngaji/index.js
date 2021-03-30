import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Share,
  Image,
  RefreshControl,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Linking
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
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData, isRefresh, itemsRemove } from "../../actions/ngaji";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class Ngaji extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  componentWillMount(){
    this.props.loading(true);
    this.props.itemsRemove(); 
    this.props.fetchData(this.state.page); 
  }

  _handleLoadMore = () => {
    const { page } = this.state;
    var total = this.props.totalDataNgaji/this.props.perPageNgaji;
    if(page < total && this.props.totalDataNgaji > 20){
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
    this.props.fetchData(this.state.page); 
  };

  // Share Text
   async onShare(item) {
    try {
      const result = await Share.share({
        title: item.name,
        message: item.link
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoadingNgaji) {
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
              PageTitle="Ngaji"
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
                    refreshing={this.props.isRefreshNgaji}
                    onRefresh={this._onRefresh}
                  />
                }
                >
                <List style={{ backgroundColor: '#fff' }}>
                  {
                    this.props.itemNgaji.map((item, index) => (
                      <ListItem 
                        key={index}
                        avatar
                        style={{ marginLeft: 0 }}
                        onPress={() => Linking.openURL(item.link) }
                        >
                        <Left style={{ paddingRight: 0 }}>
                          <Button small transparent>
                            <Icon active style={{ color: '#f00' }} type="FontAwesome5" name="youtube" />
                          </Button>
                        </Left>
                        <Body style={{ paddingLeft: 0, marginLeft: 0 }}>
                          <Text style={{ color: '#f68002' }}>{ item.name }</Text>
                          <Text note style={{ fontSize: 10 }}>{ item.link }</Text>
                        </Body>
                        <Right style={{ paddingRight: 0 }}>
                          <Button small transparent onPress={() => this.onShare(item) }>
                            <Icon active style={{ color: '#f68002' }} name="share"/>
                          </Button>
                        </Right>
                      </ListItem>
                    ))
                  }
                </List>
              </ScrollView>
              {!this.props.itemNgaji.length &&
                <Body style={{ padding: 10, marginTop: 20 }}>
                  <Text note>Tidak Ada Data</Text>
                </Body>
              }
              {this.props.isModalNgaji &&
                <Spinner color="#f68002" />
              }

            </Content>
          </ImageBackground>
        </Container>
      );
    }
  }
}

function bindAction(dispatch) {
  return {
    fetchData: (bol) => dispatch(fetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    isRefresh: bol => dispatch(isRefresh(bol)),
    itemsRemove: bol => dispatch(itemsRemove(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredNgaji: state.ngajiReducer.hasErroredNgaji,
  isLoadingNgaji: state.ngajiReducer.isLoadingNgaji,
  isModalNgaji: state.ngajiReducer.isModalNgaji,
  itemNgaji: state.ngajiReducer.itemNgaji,
  isRefreshNgaji: state.ngajiReducer.isRefreshNgaji,
  perPageNgaji: state.ngajiReducer.perPageNgaji,
  totalDataNgaji: state.ngajiReducer.totalDataNgaji,
});
export default connect(mapStateToProps, bindAction)(Ngaji);
