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

import { useIsFocused } from '@react-navigation/native';

import DefaultPreference from 'react-native-default-preference';
import SSHClient from 'react-native-sshclient';
import mySSH from './SSH.js';

class Settings extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sni: "",					// snapshot_interval
			tli: "",					// timelapse_interval
			tlf: "",					// timelapse_fps
			disabled: false,
			SSH: new mySSH(),
		}
	}

	componentDidMount = () => {
		this.getAllData();
	}

	getAllData = () => {

		console.log( "getData" );

		this.setState({disabled: true});

		// connect to raspberry
		this.state.SSH.connectWithStoredData().then(async () => {
			// sni
			await this.getData("snapshot_interval", "sni");

			// tli
			await this.getData("timelapse_interval", "tli");

			// tlf
			await this.getData("timelapse_fps", "tlf");

			this.setState({disabled: false});
		})
		.catch(() => {
			Alert.alert( "Fehler!", "Keine Verbindung zum Raspberry pi." );
		});
	}
	getData = (setting, state) => {
		return new Promise( async (resolve, fail) => {
			var command = 'grep "^'+setting+'.*" /etc/motion/motion.conf';
			var data = await this.state.SSH.execute(command);
			this.setState({
				[state]: data[0].split(" ")[1]
			});
			resolve();
		});
	}

	handleSni = (val) => {
		this.setState({sni: val});
	}

	handleTli = (val) => {
		this.setState({tli: val});
	}

	handleTlf = (val) => {
		this.setState({tlf: val});
	}

	onPressBtn = async (text) => {

		this.setState({disabled: true});

		DefaultPreference.get('pass').then(async data => {
			var pass = data || "";
			if (pass != "") {

				// sni
				await this.setData(pass, "snapshot_interval", this.state.sni);

				// tli
				await this.setData(pass, "timelapse_interval", this.state.tli);

				// tlf
				await this.setData(pass, "timelapse_fps", this.state.tlf);

			}
			else {
				Alert.alert( "Fehler!", "Kein Passwort in den Verbindungsdaten gesetzt." );
			}

			Alert.alert( "Erfolg!", "Daten wurden gespeichert." );

			this.setState({disabled: false});

		}).catch(() => {
			Alert.alert( "Fehler!", "Fehler beim Abfragen der Zugangsdaten." );
			this.setState({disabled: false});
		});
	}
	setData = (pass, setting, newVal) => {
		return new Promise( async (resolve, fail) => {
			var command = 'echo "'+pass+'" | sudo -S sed -i "s/^'+setting+' .*/'+setting+' '+newVal+'/" /etc/motion/motion.conf';
			var data = await this.state.SSH.execute(command);
			resolve(data);
		});
	}

	render = () => {
		const { isFocused } = this.props;

		console.log( isFocused );
		console.log( "render" );

		return (
			<View style={styles.sectionContainer}>

				<Text style={[styles.title, styles.titleTop]}>Foto</Text>

				<Text style={styles.label}>Intervall in Sekunden (0 - 2147483647)</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.sni}
					onChangeText={this.handleSni}
				/>


				<Text style={styles.title}>Film</Text>

				<Text style={styles.label}>Intervall in Sekunden (0 - 2147483647)</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.tli}
					onChangeText={this.handleTli}
				/>

				<Text style={styles.label}>FPS (0 - 100)</Text>
				<TextInput
					style={styles.textInput}
					multiline={false}
					defaultValue={this.state.tlf}
					onChangeText={this.handleTlf}
				/>

				<View style={styles.br}></View>

				<Button
					title="Speichern"
					disabled={this.state.disabled}
					onPress={this.onPressBtn}
				/>
			</View>
		);
	}
}

// Wrap and export
export default function(props) {
  const isFocused = useIsFocused();

  return <Settings {...props} isFocused={isFocused} />;
}

const styles = StyleSheet.create({
	title: {
		fontSize: 15,
		fontWeight: "bold",
		marginTop: 25
	},
	titleTop: {
		marginTop: 0
	},
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