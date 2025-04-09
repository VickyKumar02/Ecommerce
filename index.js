/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import AppNavigation from './src/navigation/AppNavigation';

AppRegistry.registerComponent(appName, () => AppNavigation);
