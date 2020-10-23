import React, { Component } from 'react';

import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	Button,
	Alert
} from 'react-native';

export default class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 20 }}>
				<Text style={{ textAlign: 'center' }}>
					Made by Sandro Venetz{"\n"}
					2020{"\n"}{"\n"}
					To connect to a raspberry pi, set connection data in settings menu.
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
});