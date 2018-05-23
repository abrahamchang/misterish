import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Permissions } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';

import MisteryDetail from '../components/MisteryDetail';

class Home extends Component {

    onPress(id) {
       const resetItems = StackActions.reset({
           index: 0,
           actions: [{
               type: 'Navigation/INIT',
               routeName: 'Scanner',
               params: id
           }]
       });
       this.props.navigation.dispatch(resetItems);
    }

    prepareData() {
        const { params } = this.props.navigation.state;
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
            <View style={{ flex: 1, backgroundColor: '#553285' }}>
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
            </View>
        );
    }
}

export { Home };