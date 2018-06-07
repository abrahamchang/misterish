import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText }) => {

    const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style = { containerStyle }>
            <Text style = { labelStyle }>{ label }</Text>
            <TextInput
                style = { inputStyle }
                value = { value }
                onChangeText = { onChangeText }
            />
        </View>    
    );


};

const styles = {

    inputStyle: {
        color: '#000',
        paddingRight: 0,
        paddingLeft: 4,
        fontSize: 20,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 10,
        paddingLeft: 0,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }

};

export default Input;