{/*  */}
import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Image, Button, ScrollView } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
{/*  */}
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import UserDetails from '../components/profile/UserDetails';
import MisteryDetailProfile from '../components/profile/MisteryDetailProfile';
import CardSection from '../components/common/CardSection';

import MisteryDetail from '../components/MisteryDetail';

class Profile extends Component {

    state = { text: '' };

    prepareData() {
        const params = this.props.navigation.state.params;
        const keys = Object.keys(params);
        const data = [];
        keys.forEach((key) => {
            data.push(params[key]);
        });
        return data;
    }

    componentDidMount() {
        const { status } = Permissions.askAsync(Permissions.CAMERA);
    }

    render() {

        return (

            <ScrollView>
                <Card>
                    <CardSection>
                        <UserDetails></UserDetails>
                    </CardSection>

                    <CardSection>
                        <FlatList
                            numColumns={2}
                            data={this.prepareData()}
                            keyExtractor={(item) => item.id}
                            renderItem={(item) => <MisteryDetail
                                id={item.id}
                                imageURL={item.item.imageURL}
                                name={item.item.name}
                                description={item.item.description}
                                difficulty={item.item.dificulty}
                                userID={item.item.userID}
                                reviews={item.item.reviews}
                                onPress={() => this.onPress(item.item.id)}
                            />}
                        />
                    </CardSection>
                </Card>
            </ScrollView>

        );
    }
}

const styles = {

    buttonContentStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonStyle: {
        height: 50,
        width: 50,
    },

    headerContentStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    headerTextStyle: {
        fontSize: 30
    },

    titleTextStyle: {
        fontSize: 30,
        marginLeft: 10
    },

    flHeaderTextStyle: {
        fontSize: 24
    },

    mlHeaderTextStyle: {
        fontSize: 24
    },

    levelTextStyle: {
        fontSize: 18
    },

    flLevelTextStyle: {
        fontSize: 12
    },

    thumbnailStyle: {
        height: 100,
        width: 100
    },

    flThumbnailStyle: {
        height: 80,
        width: 80
    },

    mlThumbnailStyle: {
        height: 80,
        width: 80
    },

    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },

};

export default Profile;