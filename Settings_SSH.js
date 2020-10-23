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

import DefaultPreference from 'react-native-default-preference';
import mySSH from './SSH.js';

export default class Settings_SSH extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			ip: '',
			user: '',
			pass: '',
			disabled: false,
			SSH: new mySSH(),
		}
	}

	componentDidMount = () => {
		this.getDataFromDefaultPreferences();
	}

	componentDidUpdate = () => {
		console.log( "updated" );
	}

	getDataFromDefaultPreferences = () => {
		DefaultPreference.getMultiple(['ip', 'user', 'pass']).then(data => {
			this.setState({
				ip: data[0] || "",
				user: data[1] || "",
				pass: data[2] || ""
			});
		});
	}

	handleIp = (val) => {
		this.setState({ip: val});
	}

	handleUser = (val) => {
		this.setState({user: val});
	}

	handlePass = (val) => {
		this.setState({pass: val});
	}

	onPressBtn = (text) => {

		this.setState({disabled: true});

		var data = {
			'ip': this.state.ip,
			'user': this.state.user,
			'pass': this.state.pass
		}

		// Speichern
		DefaultPreference.setMultiple(data).then(() => {

			// Verbindungsversuch
			this.state.SSH.connect(
				this.state.ip,
				this.state.user,
				this.state.pass
			).then(() => {
				// Success !
				Alert.alert( "Erfolg!", "Verbindung konnte erfolgreich hergestellt werden." );
				this.setState({disabled: false});

				// disconnect
				this.state.SSH.disconnect();
			}).catch(() => {
				// Fail :(
				Alert.alert( "Fehlgeschlagen!", "Verbindung konnte nicht hergestellt werden." );
				this.setState({disabled: false});
			});
		})
		.catch((error) => {
			this.setState({disabled: false});
			alert(error);
		});
	}

	render = () => {
		return (
			<View style={styles.sectionContainer}>
				<Text style={styles.label}>IP-Adresse</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.ip}
					onChangeText={this.handleIp}
				/>

				<Text style={styles.label}>Benutzer</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.user}
					onChangeText={this.handleUser}
				/>

				<Text style={styles.label}>Passwort</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.pass}
					onChangeText={this.handlePass}
					secureTextEntry={true}
				/>

				<View style={styles.br}></View>

				<Button
					title="Testen"
					disabled={this.state.disabled}
					onPress={this.onPressBtn}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1
	},
	label: {
		marginTop: 7
	},
	br: {
		marginTop: 14
	}
});