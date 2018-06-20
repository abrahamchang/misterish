import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Loading from './src/screens/Loading';

import Settings from './src/screens/Settings';
import { Home } from './src/screens/Home';
import Scanner from './src/screens/Scanner';
import Header from './src/components/Header';
import Login from './src/screens/Login';
import Recovery from './src/screens/Recovery';
import Register from './src/screens/Register';
import Profile from './src/screens/Profile'; 

class Router extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Navigator />
            </View>
        );
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
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Register: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        Recovery: {
            screen: Recovery,
            navigationOptions: {
                header: null
            }
        },
        Root: createBottomTabNavigator(
            {
                Profile: {
                    screen: Profile,
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
                    screen: Settings,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                source={require('./src/assets/settingsButton.png')}
                                style={[styles.icon, { tintColor: tintColor }]}
                            />
                        )
                    }
                },
            },
            {
                initialRouteName: 'Profile',
                backBehavior: false,
                tabBarOptions: {
                    showLabel: false,
                    activeTintColor: 'white',
                    activeBackgroundColor: 'rgba(54, 23, 94, 0.8)',
                    inactiveTintColor: 'white',
                    inactiveBackgroundColor: '#36175E'
                }
            }
        ),
        Scanner: {
            screen: Scanner,
            navigationOptions: {
                header: null,
                gesturesEnabled: false
            }
        }
    },
    {
        initialRouteName: 'Root',
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
};

export { Router };