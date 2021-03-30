import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { List, ListItem, InputGroup, Input, Icon } from "native-base";
import IconFA from "react-native-vector-icons/FontAwesome";
import IconSLI from "react-native-vector-icons/SimpleLineIcons";

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

class RoundImageButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryDrop: null,
		};
	}
	categoryDropdown(id) {
		if (this.state.categoryDrop === id) {
			this.setState({ categoryDrop: null });
			return;
		}
		this.setState({ categoryDrop: id });
	}
	render() {

		const navigation = this.props.navigation;
		var nav = this.props.nav;
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={styles.roundButtonsWrap}
				onPress={() => navigation.navigate(nav)}
			>
				<Image style={styles.roundButtons} source={this.props.roundImageSource} />
				<Text style={styles.text}>
					{this.props.roundImageText}
				</Text>
			</TouchableOpacity>
		);
	}
}
const styles = StyleSheet.create({
	// roundButtonsWrap: {
	// 	alignItems: "center",
	// 	height: deviceHeight / 6,
	// 	width: deviceWidth / 3 - 3,
	// 	justifyContent: "center",
	// },
	// roundButtons: {
	// 	height: (deviceWidth - 110) / 5,
	// 	width: (deviceWidth - 110) / 5,
	// 	// borderRadius: (deviceWidth - 60) / 4 / 2,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	// margin: 4,
	// 	resizeMode: "cover",
	// },
	// text: {
	// 	marginTop: 5,
	// 	alignSelf: "center",
	// 	fontSize: 11,
	// 	fontWeight: "500",
	// },

	roundButtonsWrap: {
		alignItems: "center",
		height: (deviceWidth - 60) / 3,
		width: (deviceWidth - 60) / 3,
		justifyContent: "center",
	},
	roundButtons: {
		height: (deviceWidth - 250) / 2,
		width: (deviceWidth - 250) / 2,
		borderRadius: (deviceWidth - 250) / 2 / 3,
		alignItems: "center",
		justifyContent: "center",
		margin: 4,
		resizeMode: "contain",
	},
	text: {
		alignSelf: "center",
		fontSize: 14,
		color: '#777',
		fontWeight: "bold",
	},
});
export default RoundImageButton;
