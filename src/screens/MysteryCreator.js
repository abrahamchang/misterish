import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import TarjetaNM from '../components/TarjetaNM';

class MysteryCreator extends Component {
    render() {
        return (
            <ScrollView style={{ flex: 1 }}>
                <TarjetaNM>
                    <Text>
                        Algo
                    </Text>
                </TarjetaNM>
            </ScrollView>
        );
    }
}

const styles = {

};

export default MysteryCreator;
