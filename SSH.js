import React, { Component } from 'react';

import DefaultPreference from 'react-native-default-preference';
import SSHClient from 'react-native-sshclient';

export default class mySSH extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			connected: false,
		}
	}

	connect = (ip, user, pass) => {
		return new Promise((resolve, fail) => {
			SSHClient.setup(user, ip, 22);
			SSHClient.usePrivateKey(false);
			SSHClient.setPassword(pass);
			SSHClient.connect().then(
				(result) => {
					this.setState({connected: true});
					resolve();
				},
				(error) => {
					this.setState({connected: false});
					fail();
				}
			);
		});
	}

	connectWithStoredData = () => {
		return new Promise((resolve, fail) => {
			DefaultPreference.getMultiple(['ip', 'user', 'pass']).then(data => {

				var ip = data[0] || "";
				var user = data[1] || "";
				var pass = data[2] || "";

				if ( ip == "" || user == "" || pass == "" ) {
					fail();
				}
				else {
					this.connect(ip, user, pass).then(() => {
						resolve();
					}).catch(() => {
						fail();
					})
				}
			});
		});
	}

	execute = (command) => {
		return new Promise((resolve, fail) => {
			SSHClient.execute(command).then(
				(result)=>{
					resolve(result);
				},
				(error)=>{
					fail();
				}
			);
		});
	}

	disconnect = () => {
		return new Promise((resolve, fail) => {
			SSHClient.close().then(() => {
				resolve();
			}).catch(() => {
				fail();
			});
		})
	}
}