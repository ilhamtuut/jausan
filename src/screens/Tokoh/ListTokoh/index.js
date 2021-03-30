import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
  Image,
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
  Segment,
  List,
  ListView,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Spinner
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import ThemeHeader from "../../CommonComponents/Header/index.js";
import BannerSlider from "../../CommonComponents/TokohImage/index.js";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData, itemsRemove, itemsIsRefresh } from "../../../actions/tokoh";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../../assets/bg-transparent.png");

class ListTokoh extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
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
    this.props.itemsIsRefresh(true);    
    this.props.itemsRemove();    
    this.props.fetchData(this.state.page); 
  }

  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoadingTokoh) {
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
              PageTitle="Kyaiku"
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
                    refreshing={this.props.refreshing}
                    onRefresh={this._onRefresh}
                  />
                }
                >
                <View style={{marginTop: 5}}>
                  <List
                    removeClippedSubviews={false}
                    directionalLockEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    dataArray={this.props.itemTokoh}
                    keyExtractor = { (item, index) => index.toString() }
                    renderRow={item =>
                      <BannerSlider
                        onPress={() => navigation.navigate('DetailTokoh', {
                            params: item,
                        })}
                        bannerImageSource={item.foto}
                        bannerImageText={this.Capitalize(item.name)}
                        bannerDescription={this.Capitalize(item.alamat)}
                      />}
                  />
                  {!this.props.itemTokoh.length &&
                    <Body style={{ padding: 10, marginTop: 20 }}>
                      <Text note>Tidak Ada Data</Text>
                    </Body>
                  }
                </View>
              </ScrollView>
              {/*<List style={{ backgroundColor: '#fff' }}>
                {
                  this.props.itemTokoh.map((item, index) => (
                    <ListItem 
                      key={index}
                      avatar
                      onPress={() => navigation.navigate('DetailTokoh', {
                          params: item,
                      })}
                      >
                      <Left>
                        <Thumbnail source={{uri: item.foto}} />
                      </Left>
                      <Body>
                        <Text style={{ color: '#f68002' }}>{ item.name }</Text>
                        <Text note>{ item.alamat }</Text>
                      </Body>
                    </ListItem>
                  ))
                }
              </List>*/}
              {this.props.isModalTokoh &&
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
  hasErroredTokoh: state.tokohReducer.hasErroredTokoh,
  isLoadingTokoh: state.tokohReducer.isLoadingTokoh,
  isModalTokoh: state.tokohReducer.isModalTokoh,
  itemTokoh: state.tokohReducer.itemTokoh,
  perPage: state.tokohReducer.perPage,
  totalData: state.tokohReducer.totalData,
  refreshing: state.tokohReducer.refreshing,
});
export default connect(mapStateToProps, bindAction)(ListTokoh);
