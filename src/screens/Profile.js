{/* React Native Components */}
import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { Text, Image, Button, ScrollView } from 'react-native'
import { Permissions } from 'expo'
import { StackActions, NavigationActions } from 'react-navigation'
{/* Common Components */ }
import Card from '../components/common/Card'
import Input from '../components/common/Input'
import CardSection from '../components/common/CardSection'
{/* Profile Unique Components */ }
import UserDetails from '../components/profile/UserDetails'
import MisteryDetailProfile from '../components/profile/MisteryDetailProfile'
import FriendList from '../components/profile/FriendList'
{/* Components */ }
import MisteryDetail from '../components/MisteryDetail'


class Profile extends Component {

    state = { text: '' };

    prepareData() {
        const user = this.props.navigation.state.params.user;
        const keys = Object.keys(params);
        const data = [];
        keys.forEach((key) => {
            data.push(params[key]);
        });
        return data;
    }

    render() {
        this.prepareData();
        return (
            <ScrollView>
                <Card>
                    <CardSection>
                    {/* User Details: Avatar, Name, Level */}
                        <UserDetails></UserDetails>
                    </CardSection>
                    {/* Completed / In Progress Misteries */}
                    <CardSection>
                        <FlatList
                            numColumns={3}
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

                    {/* Created Misteries */}
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

};

export default Profile;