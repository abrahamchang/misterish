import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';
import MisteryList from '../components/MisteryList';

class Home extends Component {
    render() {
        return (
            <View>
                <Header />
                <MisteryList />
            </View>
        );
    }
}

export { Home };