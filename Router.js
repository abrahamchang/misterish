import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import Loading from './src/screens/Loading';
import Settings from './src/screens/Settings';
import Profile from './src/screens/Profile';
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
    },
    home: createBottomTabNavigator({
        profile: {
            screen: Profile
        },
        home: {
            screen: Home
        },
        settings: {
            screen: Settings
        }
    })
}, {
    navigationOptions: {
        header: null
    }
});

export { Router }