import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
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
  Fab,
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
import Root from '../../../root/Url';
import ThemeHeader from "../../CommonComponents/Header/index.js";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData, itemsRemove } from "../../../actions/konsultasi";
var deviceWidth = Dimensions.get("window").width;
const bg = require("../../../../assets/bg-transparent.png");

class Advokasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      page: 1
    };
  }

  componentWillMount(){
    this.props.loading(true);
    this.props.itemsRemove();    
    this.props.fetchData(this.state.page);  
  }
  
  componentDidMount() {
    // this.props.loading(false);
  }

  detailData(){

  }
  
  _handleLoadMore = () => {
    const { page } = this.state;
    var total = this.props.totalData/this.props.perPage;
    if(page < total){
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

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoadingKonsultasi) {
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
              PageTitle="Konsultasi"
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
              <List style={{ backgroundColor: '#fff' }}>
                {
                  this.props.itemKonsultasi.map((item, index) => (
                    <ListItem 
                      key={index}
                      avatar
                      onPress={() => this.detailData() }
                      >
                      <Body style={{ marginLeft: 0 }}>
                        <Text style={{ color: '#f68002' }}>{ item.judul }</Text>
                        <Text note numberOfLines={1}>{ item.keterangan }</Text>
                      </Body>
                    </ListItem>
                  ))
                }
              </List>

              {this.props.isModalKonsultasi &&
                <Spinner color="#f68002" />
              }
            </Content>
            <Fab
              active={this.state.active}
              direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#f68002', marginBottom: 30 }}
              position="bottomRight"
              onPress={() => navigation.navigate('AddKonsultasi') }>
              <Icon name="md-add" />
            </Fab>
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
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    itemsRemove: (data) => dispatch(itemsRemove(data))
  };
}

const mapStateToProps = state => ({
  hasErroredKonsultasi: state.konsultasiReducer.hasErroredKonsultasi,
  isLoadingKonsultasi: state.konsultasiReducer.isLoadingKonsultasi,
  isModalKonsultasi: state.konsultasiReducer.isModalKonsultasi,
  itemKonsultasi: state.konsultasiReducer.itemKonsultasi,
  perPage: state.konsultasiReducer.perPage,
  totalData: state.konsultasiReducer.totalData,
});
export default connect(mapStateToProps, bindAction)(Advokasi);
