import React, { Component } from "react";
import {
  View,
  H1,
  Text,
  InputGroup,
  Input,
  Icon,
  Header,
  Container,
  Button,
  List,
  ListItem,
  Badge,
  Content,
  Card,
  CardItem,
  Left,
  Right,
  Title,
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
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal
} from "react-native";
import moment from 'moment'; 
import Style from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import MyFooter from "../CommonComponents/Footer";
import ThemeHeader from "../CommonComponents/Header/index.js";
import { Table, TableWrapper, Row } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchDataAbsen } from "../../actions/category";
var { height, width } = Dimensions.get("window");
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../assets/bg-transparent.png");

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      loadingMore: false
    };
  }

  componentWillMount(){
    this.props.fetchData();    
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={bg} style={Style.backgroundImageLogin}>
        <ThemeHeader
            PageTitle="Koleksi"
            IconLeft="arrow-back"
            route="homepage"
            navigation={navigation}
          />
        <Content
          contentContainerStyle={{ paddingBottom: 10 }}
          style={{ backgroundColor: "transparent", marginBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <List>
            {
              this.props.items.map((item, index) => (
                <ListItem 
                  style={{marginLeft: 0}}
                  key={index}
                  button
                  onPress={() => navigation.navigate("ListNews", {
                            titlePage: item.name,
                            count: item.count,
                            url: item._links['wp:post_type']['0'].href+'&_embed'
                          })}>
                  <Body>
                    <Text style={Style.textMuted}>{item.name}</Text>
                  </Body>
                  <Right>
                    <Badge success>
                      <Text style={Style.textBadge}>{item.count}</Text>
                    </Badge>
                  </Right>
                </ListItem>
              ))
            }
          </List>
        </Content>
        </ImageBackground>
        {/*<MyFooter navigation={navigation} selected={"categories"} />*/}
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(fetchDataAbsen(bol)),
    loading: bol => dispatch(itemsIsLoading(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol))
  };
}

const mapStateToProps = state => ({
  hasErrored: state.categoryReducer.hasErrored,
  isLoading: state.categoryReducer.isLoading,
  isModal: state.categoryReducer.isModal,
  items: state.categoryReducer.items
});
export default connect(mapStateToProps, bindAction)(Category);
