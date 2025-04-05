/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { registerRootComponent } from 'expo';
import App from './App'; // Pastikan path betul

registerRootComponent(App); // Ini akan urus AppRegistry.registerComponent
