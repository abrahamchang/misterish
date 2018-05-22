import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import MisteryList from '../components/MisteryList';

import { Permissions } from 'expo';

class Home extends Component {
    componentWillMount() {
        const { status } = Permissions.askAsync(Permissions.CAMERA);
    }

    render() {
        return (
            <View>
                <Header tituloHeader='Misterish' />
                <MisteryList />
            </View>
        );
    }
}

export { Home };