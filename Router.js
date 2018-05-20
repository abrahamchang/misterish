
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import Loading from './src/screens/Loading';
import Developing from './src/screens/Developing';
import { Home } from './src/screens/Home';
import MenuBar from './src/components/MenuBar';
import Header from './src/components/Header';

class Router extends Component {
    render() {
        if (true) {
            return (
                <View style={{ flex: 1 }}>
                    <Navigator />

                </View>
            );
        }
    }
}

const Navigator = createStackNavigator(
    {
        Loading: {
            screen: Loading,
            navigationOptions: {
                header: null
            }
        },
        Root: createStackNavigator(
            {
                Profile: {
                    screen: Developing
                },
                Home: {
                    screen: Home
                },
                Settings: {
                    screen: Developing
                }
            },
            {
                initialRouteName: 'Home',
                navigationOptions: {
                    header: <MenuBar />,
                }
            }
        )
    },
    {
        initialRouteName: 'Loading',
        navigationOptions: {
            header: <Header tituloHeader='Misterish' />
        }
    }
);

export { Router };