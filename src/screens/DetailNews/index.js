import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  Item,
  Input,
  CardItem,
  Left,
  Body,
  Right,
  Badge,
  List,
  ListView,
  ListItem,
  Tabs,
  Tab,
  Footer
} from "native-base";
import {
  Image,
  ImageBackground,
  Dimensions,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator
} from "react-native";
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';
import styles from "./style.js";
import Root from '../../root/Url';
import { connect } from "react-redux";
import { itemsFetchData, itemsIsLoading } from "../../actions/detailnews";
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;
import ThemeHeader from "../CommonComponents/Header";

class DetailNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      visible: true
    };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }

  render() {
    const navigation = this.props.navigation;
    const params = navigation.state.params;
    const titlePage = params.titlePage;
    const title = params.title;
    const description = params.description;
    const time = params.time;
    const author = params.author;
    const img = params.image;
    const link = params.link;

    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoad={() => this.hideSpinner()}
          style={{ flex: 1 }}
          source={{ uri: link }} />
        {this.state.visible && (
          <ActivityIndicator
            style={{ position: "absolute", top: deviceHeight / 2, left: deviceWidth / 2.1 }}
            size="large"
          />
        )}
      </View>
    );

    // return(
    //   <Container>
    //     <ThemeHeader
    //       PageTitle={titlePage}
    //       IconLeft="arrow-back"
    //       route="homepage"
    //       navigation={navigation}
    //     />
    //     <Content
    //       style={{ backgroundColor: "#fff", marginBottom: 0 }}
    //       contentContainerStyle={{ paddingBottom: 10 }}
    //     >

    //       <View style={{ padding: 5 }}>
    //         <View>
    //           <Text style={styles.productName} numberOfLines={2} ellipsizeMode='tail'> {title}</Text>
    //         </View>
    //         <View style={{ padding: 5, flex:1, flexDirection: 'row', justifyContent:'space-between' }}>
    //           <View>
    //             <Text style={styles.tagText}><Icon type="SimpleLineIcons" name="user" style={styles.priceTag} /> {author} </Text>
    //           </View>
    //           <View>
    //             <Text style={styles.tagText}><Icon type="SimpleLineIcons" name="clock" style={styles.priceTag} /> {time}</Text>
    //           </View>
    //         </View>
    //       </View>

    //       <View
    //         style={{
    //           padding: 10,
    //           paddingTop: 5,
    //           borderTopWidth: 1,
    //           borderTopColor: "#ddd"
    //         }}
    //       >
    //         <Image style={styles.sliderImage} source={{uri: img}}/>
    //         <HTMLView
    //           stylesheet={styles}
    //           value={description}
    //           addLineBreaks={false}
    //         />
    //       </View>

    //     </Content>
    //   </Container>
    // );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: bol => dispatch(itemsFetchData(bol)),
    loading: bol => dispatch(itemsIsLoading(bol))
  };
}

const mapStateToProps = state => ({
  hasErrored: state.detailNewsReducer.hasErrored,
  isLoading: state.detailNewsReducer.isLoading,
  items: state.detailNewsReducer.items
});
export default connect(mapStateToProps, bindAction)(DetailNews);
