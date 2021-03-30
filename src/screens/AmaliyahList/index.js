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
import Root from '../../root/Url';
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData,itemsRemove, isRefresh } from "../../actions/amaliyahlist";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
const bg = require("../../../assets/bg-transparent.png");

class Amaliyah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      page:1,
      category:1
    };
  }

  componentWillMount(){
    // const navigation = this.props.navigation;
    // const id = navigation.state.params.params.id;    
    const id = this.state.category;
    const page = this.state.page;
    var url = Root.link + 'category/content/'+ id +'?page='+page;    
    this.props.isRefresh(false);
    this.props.loading(true);
    this.props.itemsRemove([]); 
    this.props.fetchData(url);    
  }

  _handleLoadMore = () => {
    const { page } = this.state;
    var total = this.props.totalDataList/this.props.perPageList;
    // const navigation = this.props.navigation;
    // const id = navigation.state.params.params.id;
    const id = this.state.category;    
    if(page < total && this.props.totalDataList > 20){
      this.props.itemsIsModal(true);
      this.setState(
        (prevState, nextProps) => ({
          page: prevState.page + 1
        }),
        () => {
          var url = Root.link + 'category/content/'+ id +'?page='+this.state.page;    
          this.props.fetchData(url);
        }
      );
    }
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 1;
  };

  _onRefresh = () => {
    // const navigation = this.props.navigation;
    // const id = navigation.state.params.params.id;  
    const id = this.state.category;    
    this.props.isRefresh(true);
    this.props.itemsRemove();    
    this.props.fetchData(id); 
  }

  // string.toUpperCase()
  
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    const navigation = this.props.navigation;
    // const name = this.Capitalize(navigation.state.params.params.name);
    const name = 'Amaliyah';
    if (this.props.isLoadingAmaliyahList) {
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
              PageTitle={name}
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
                  refreshing={this.props.isRefreshList}
                  onRefresh={this._onRefresh}
                />
              }
              >
                <List style={{ backgroundColor: '#fff' }}>
                  {
                    this.props.itemAmaliyahList.map((item, index) => (
                      <ListItem 
                        key={index}
                        avatar
                        onPress={() => navigation.navigate('DetailData',{
                          params: item
                        })}
                        >
                        <Body style={{ marginLeft: 0 }}>
                          <Text style={{ color: '#f68002' }}>{ this.Capitalize(item.judul) }</Text>
                        </Body>
                      </ListItem>
                    ))
                  }
                </List>
                {!this.props.itemAmaliyahList.length &&
                  <Body style={{ padding: 10, marginTop: 20 }}>
                    <Text note>Tidak Ada Data</Text>
                  </Body>
                }
                {this.props.isModalAmaliyahList &&
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
    fetchData: (bol) => dispatch(fetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    itemsRemove: bol => dispatch(itemsRemove(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    isRefresh: bol => dispatch(isRefresh(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredAmaliyahList: state.amaliyahListReducer.hasErroredAmaliyahList,
  isLoadingAmaliyahList: state.amaliyahListReducer.isLoadingAmaliyahList,
  isModalAmaliyahList: state.amaliyahListReducer.isModalAmaliyahList,
  itemAmaliyahList: state.amaliyahListReducer.itemAmaliyahList,
  perPageList: state.amaliyahListReducer.perPageList,
  totalDataList: state.amaliyahListReducer.totalDataList,
  isRefreshList: state.amaliyahListReducer.isRefreshList,
});
export default connect(mapStateToProps, bindAction)(Amaliyah);
