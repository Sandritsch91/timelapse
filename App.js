import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	Button,
	StatusBar,
} from 'react-native';


// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import myHome from './Home.js'
import myPreview from './Preview.js'
import mySettings from './Settings.js'
import mySettings_SSH from './Settings_SSH.js'


const Drawer = createDrawerNavigator();


const App: () => React$Node = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator initialRouteName="myHome">
				<Drawer.Screen name="Home" component={myHome} />
				<Drawer.Screen name="Vorschau" component={myPreview} />
				<Drawer.Screen name="Einstellungen" component={mySettings} />
				<Drawer.Screen name="Verbindungseinstellungen" component={mySettings_SSH} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
};


export default App;