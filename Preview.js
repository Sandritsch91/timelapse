import React, { Component } from 'react';

import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	Button,
	Alert
} from 'react-native';

import { WebView } from 'react-native-webview';

import DefaultPreference from 'react-native-default-preference';
import mySSH from './SSH.js';

export default class Preview extends React.Component {

	constructor(props) {
		super(props);
	}

	render = () => {
		return <WebView source={{ uri: 'https://reactnative.dev/' }} />;
	}
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
});