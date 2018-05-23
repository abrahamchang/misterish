
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
        Root: createBottomTabNavigator(
            {
                Profile: {
                    screen: Developing,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                source={require('./src/assets/id-cardButton.png')}
                                style={[styles.icon, { tintColor: tintColor }]}
                            />
                        )
                    }
                },
                Home: {
                    screen: Home,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                source={require('./src/assets/homeButton.png')}
                                style={[styles.icon, { tintColor: tintColor }]}
                            />
                        )
                    }
                },
                Settings: {
                    screen: Developing,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                source={require('./src/assets/settingsButton.png')}
                                style={[styles.icon, { tintColor: tintColor }]}
                            />
                        )
                    }
                }
            },
            {
                initialRouteName: 'Home',
                tabBarOptions: {
                    showLabel: false,
                    activeTintColor: 'white',
                    activeBackgroundColor: 'rgba(54, 23, 94, 0.8)',
                    inactiveTintColor: 'white',
                    inactiveBackgroundColor: '#36175E'
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

const styles = {
    icon: {
        width: 26,
        height: 26,
    }
}

export { Router };