import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Loading from './src/screens/Loading';
import { Home } from './src/screens/Home';

class Router extends Component {
    render() {
        return (
            <Navigator />
        );
    }
}

const Navigator = createStackNavigator({
    loading: {
        screen: Loading,
        navigationOptions: {
            header: null
        }
    },
    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    }
});

export { Router }