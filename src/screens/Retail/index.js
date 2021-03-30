import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Image,
  RefreshControl,
  ImageBackground,
  Dimensions,
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
  List,
  ListItem,
  Left,
  Body,
  Right,
  Segment,
  Spinner,
  Thumbnail
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../CommonComponents/Header/index.js";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData, itemsIsRefresh, itemsRemove } from "../../actions/retail";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class Retail extends Component {
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
    this.props.itemsIsRefresh(true);    
    this.props.itemsRemove();    
    this.props.fetchData(this.state.page); 
  };

  render() {
    const navigation = this.props.navigation;
    // console.warn(JSON.stringify(this.props))
    if (this.props.isLoadingRetail) {
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
              PageTitle="Ansor Retail"
              IconLeft="arrow-back"
              route="homepage"
              navigation={navigation}
            />
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "transparent", marginBottom: 30, padding: 0 }}
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
                    refreshing={this.props.isRefreshRetail}
                    onRefresh={this._onRefresh}
                  />
                }
                >
                <List style={{ backgroundColor: '#fff' }}>
                  {
                    this.props.itemRetail.map((item, index) => (
                      <ListItem 
                        key={index}
                        avatar
                        onPress={() => navigation.navigate('RetailDetail', {
                            params: item,
                        })}
                        >
                        <Left>
                          <Thumbnail style={{ height: 50, width: 50 }} source={{uri: item.image}} />
                        </Left>
                        <Body>
                          <Text style={{ color: '#f68002' }}>{ item.nama_perusahaan }</Text>
                          <Text note style={{ fontSize: 10 }}>Kategori : { item.lapak ? item.lapak.name : '-' }</Text>
                        </Body>
                      </ListItem>
                    ))
                  }
                </List>
              </ScrollView>
              {!this.props.itemRetail.length &&
                <Body style={{ padding: 10, marginTop: 20 }}>
                  <Text note>Tidak Ada Data</Text>
                </Body>
              }
              {this.props.isModalRetail &&
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
    itemsRemove: bol => dispatch(itemsRemove(bol)),
    itemsIsRefresh: bol => dispatch(itemsIsRefresh(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredRetail: state.retailReducer.hasErroredRetail,
  isLoadingRetail: state.retailReducer.isLoadingRetail,
  isModalRetail: state.retailReducer.isModalRetail,
  itemRetail: state.retailReducer.itemRetail,
  perPageRetail: state.retailReducer.perPageRetail,
  totalDataRetail: state.retailReducer.totalDataRetail,
  isRefreshRetail: state.retailReducer.isRefreshRetail,
});
export default connect(mapStateToProps, bindAction)(Retail);
