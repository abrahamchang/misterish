import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import MisteryDetail from '../components/MisteryDetail';

class Home extends Component {

    onPress(id) {
       this.props.navigation.navigate({ routeName: 'Scanner', params: id });
    }

    prepareData() {
        if (this.props.navigation.state.params.params.params) {
            const params = this.props.navigation.state.params.params.params;
            const keys = Object.keys(params);
            const data = [];
            keys.forEach((key) => {
                data.push(params[key]);
            });
            return data;
        } else {
            const params = this.props.navigation.state.params.params;
            const keys = Object.keys(params);
            const data = [];
            keys.forEach((key) => {
                data.push(params[key]);
            });
            return data;
        }
    }

    componentDidMount() {
        const { status } = Permissions.askAsync(Permissions.CAMERA);
    }

    render() {
       return (
            <View style={{ flex: 1, backgroundColor: '#553285' }}>
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
            </View>
        );
    }
}

export { Home };