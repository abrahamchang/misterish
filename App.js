import React from 'react';
import { StyleSheet, Text, View, YellowBox } from 'react-native';
import _ from 'lodash';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from "./Router";
import reducers from './src/reducers';

YellowBox.ignoreWarnings(['Setting a timer', 'Deprecation warning', 'Warning: Can\'t call setState (or forceUpdate) on an unmounted component.']);
const _console = _.clone(console);

console.warn = message => {
	if (message.indexOf('Setting a timer') <= -1) {
		_console.warn(message);
	}
};

export default class App extends React.Component {
  render() {
    return (
    	<Provider store={createStore(reducers)}>
    		<Router />
		</Provider>
    );
  }
}
