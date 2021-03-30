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
  Alert,
  PermissionsAndroid,
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
  ListItem,
  Spinner,
  Body
} from "native-base";
import Style from "./style.js";
import { connect } from "react-redux";
import Share from 'react-native-share';
import ThemeHeader from "../CommonComponents/Header/index.js";
import { itemsFetchData, itemsIsLoading, itemsIsModal, fetchData,itemsRemove, isRefresh } from "../../actions/quote";
import RNFetchBlob from 'rn-fetch-blob';

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
const {height, width} = Dimensions.get("window");
const bg = require("../../../assets/bg-transparent.png");

export async function request_storage_runtime_permission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: "App Storage Permission",
        message: "App needs access to your storage to download Photos.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) { 
      // Alert.alert("Storage Permission Granted.");
    }else {
      // Alert.alert("Storage Permission Not Granted");
    }
  } catch (err) {
    console.warn(err)
  }
}

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      page:1
    };
  }

  componentWillMount(){   
    this.props.isRefresh(false);
    this.props.loading(true);
    this.props.itemsRemove([]);    
    this.props.fetchData(this.state.page);    
  }

  async componentDidMount() {
    await request_storage_runtime_permission()
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
    this.props.fetchData(this.state.page); 
  }

  // string.toUpperCase()
  
  Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  downloadImage = (item) => {
    var quote = item.quote;
    var foto_quote = item.foto_quote;
    var foto_kegiatan = item.foto_kegiatan;
    var date = new Date();
    var ext = this.getExtention(foto_kegiatan);
    ext = "." + ext[0];
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: PictureDir + "/image_" + Math.floor(date.getTime()
          + date.getSeconds() / 2) + ext,
        description: 'Image'
      }
    }
    config(options).fetch('GET', foto_kegiatan).then((res) => {
      Alert.alert(
        '',
        'Image Downloaded Successfully'
      );
    });
  }

  getExtention = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) :
      undefined;
  }

  shareFile(item) {
    var quote = item.quote;
    var foto_quote = item.foto_quote;
    var foto_kegiatan = item.foto_kegiatan;
    let imagePath = null;
    const { fs } = RNFetchBlob;
    RNFetchBlob.config({
        fileCache: true
    })
    .fetch("GET", foto_kegiatan)
    // the image is now dowloaded to device's storage
    .then(resp => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile("base64");
    })
    .then(async base64Data => {
        var base64Data = 'data:image/png;base64,' + base64Data;
        // here's base64 encoded image
        // await Share.open({ url: base64Data });
        await Share.open({ url: base64Data })
          .then((res) => { console.log(res) })
          .catch((err) => { err && console.log(err); });
        // remove the file from storage
        return fs.unlink(imagePath);
    });
  }

  render() {
    const navigation = this.props.navigation;
    if (this.props.isLoadingQuote) {
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
              PageTitle="Quote"
              IconLeft="arrow-back"
              route="homepage"
              navigation={navigation}
            />
            <Content
              showsVerticalScrollIndicator={false}
              style={{ backgroundColor: "transparent", marginBottom: 30 }}
              contentContainerStyle={{ paddingBottom: 0 }}
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
                    refreshing={this.props.isRefreshQuote}
                    onRefresh={this._onRefresh}
                  />
                }
                >
                <List
                  removeClippedSubviews={false}
                  directionalLockEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  dataArray={this.props.itemQuote}
                  keyExtractor = { (item, index) => index.toString() }
                  renderRow={item =>
                    <View style={Style.containerSlide}>
                      <Image style={Style.sliderImage} source={{uri:item.foto_kegiatan}}/>
                      <ListItem style={{ flex:1, flexDirection: 'row', justifyContent:'space-between', borderBottomWidth: 0, paddingBottom: 5, paddingTop: 5 }}>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => this.shareFile(item)}
                          >
                          <Text style={{ color: '#f68002', textAlign: 'center', fontSize: 14  }}><Icon style={{ color: '#f68002', fontSize: 16 }} name="share"/> Bagikan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          activeOpacity={1}
                          onPress={() => this.downloadImage(item)}
                          >
                          <Text style={{ color: '#f68002', textAlign: 'center', fontSize: 14  }}><Icon style={{ color: '#f68002', fontSize: 16 }} name="download"/> Download</Text>
                        </TouchableOpacity>
                      </ListItem>
                    </View>
                  }
                />
                {!this.props.itemQuote.length &&
                  <Body style={{ padding: 10, marginTop: 20 }}>
                    <Text note>Tidak Ada Data</Text>
                  </Body>
                }
              </ScrollView>

              {this.props.isModalQuote &&
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
    itemsRemove: bol => dispatch(itemsRemove(bol)),
    itemsIsModal: bol => dispatch(itemsIsModal(bol)),
    isRefresh: bol => dispatch(isRefresh(bol))
  };
}

const mapStateToProps = state => ({
  hasErroredQuote: state.quoteReducer.hasErroredQuote,
  isLoadingQuote: state.quoteReducer.isLoadingQuote,
  isModalQuote: state.quoteReducer.isModalQuote,
  itemQuote: state.quoteReducer.itemQuote,
  perPage: state.quoteReducer.perPage,
  totalData: state.quoteReducer.totalData,
  isRefreshQuote: state.quoteReducer.isRefreshQuote,
});
export default connect(mapStateToProps, bindAction)(Quote);
