import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Alert = ({ title, text, onPressOk, onPressCancel }) => {

    const { viewStyle, textArea, buttonArea, imageStyle, buttonContainer } = styles;
    if (onPressCancel) {
        return (
            <View style={viewStyle}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginTop: '3%' }}>{title}</Text>
                <View style={textArea}>
                    <Text style={{ color: '#f4f4f4', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{text}</Text>
                </View>
                <View style={buttonArea}>
                    <TouchableOpacity style={buttonContainer} onPress={onPressOk}>
                        <Image style={imageStyle} source={require('../assets/acceptIcon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={buttonContainer} onPress={onPressCancel}>
                        <Image style={imageStyle} source={require('../assets/cancelIcon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={viewStyle}>
                <Text style={{ color: 'white', fontWeight: 'bold', marginTop: '3%' }}>{title}</Text>
                <View style={textArea}>
                    <Text style={{ color: '#f4f4f4', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{text}</Text>
                </View>
                <View style={buttonArea}>
                    <TouchableOpacity style={buttonContainer} onPress={onPressOk}>
                        <Image style={imageStyle} source={require('../assets/acceptIcon.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

const styles = {
    viewStyle: {
        width: '80%',
        height: '60%',
        backgroundColor: 'rgba(85, 50, 133, 0.7)',
        elevation: 2,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '3%',
        borderRadius: 15
    },
    textArea: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1
    },
    buttonContainer: {
        height: '50%',
    },
    imageStyle: {
        resizeMode: 'contain',
        flex: 1
    }
};

export default Alert;