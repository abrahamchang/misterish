import React, { Component } from 'react';
import { LayoutAnimation, Text, UIManager, View } from 'react-native';
import Button from '../components/common/Button';

class MysteryCreator extends Component {
    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    render() {
        if (this.state.algo) {
            return (
                <View style={{ height: '30%' }} >
                    <Button onPress={this.funcion.bind(this)}>
                       <Text>Un texto</Text>
                    </Button>
                </View>
            );
        } else {
            return (
                <View>
                    <Text>Un texto</Text>
                    <Text>Un texto</Text>
                    <Text>Un texto</Text>
                    <Text>Un texto</Text>
                    <Text>Un texto</Text>
                    <Text>Un texto</Text>
                </View>            
            );
        }
    }
}

export default MysteryCreator;
