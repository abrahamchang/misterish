import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Image, Button } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import Card from '../components/common/Card';
import CardSection from '../components/common/CardSection';

class Profile extends Component {

    render() {
        return(
            <Card>
                <CardSection>
                    <View style={ styles.thumbnailContainerStyle }>
                        <Image
                            style={ styles.thumbnailStyle }
                            source={{ uri: 'https://pbs.twimg.com/profile_images/968356635344359424/Zyb6QzXB_400x400.jpg' }}
                        />
                    </View>
                    <View style={ styles.headerContentStyle }>
                        <Text style={ styles.headerTextStyle }>CrazyBK</Text>
                        <Text style={ styles.levelTextStyle }>Level: 420</Text>
                    </View>
                    <View style={ styles.buttonContentStyle }>
                        <Button style={ styles.buttonStyle }
                            title = ' + '
                        />
                    </View>
                </CardSection>
            </Card> 
        );
    }
}

const styles = {

    buttonContentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonStyle: {
        height: 50,
        width: 50
    },

    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle: {
        fontSize: 32
    },

    levelTextStyle: {
        fontSize: 20
    },

    thumbnailStyle: {
        height: 110,
        width: 110
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

};

export default Profile;