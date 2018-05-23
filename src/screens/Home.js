import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import firebase from 'firebase';


import MisteryDetail from '../components/MisteryDetail';
import config from '../../Keys'

class Home extends Component {

    state = { misteries: {}, loading: true };

    getItem(item) {
        return firebase.database().ref(item).once("value");
    }

    componentWillMount() {
        /*
        this.getItem("misteryMetadata").then((result) => {
            this.setState({ misteries: result, loading: false });
            //console.log(this.state.misteries);
        }).catch((err) => {
            console.log(err);
        });*/
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => {
                this.setState({ misteries: response.data, loading: false })
                }
            );
    }
/*
    prepareMisteries() {
        const algo = this.state.misteries.map(mistery => {
            return mistery;
        });
        return algo;
    }
*/
    render() {
        if (!this.state.loading) {
            return (
                <View style={{ flex: 1, backgroundColor: '#553285' }}>
                    <FlatList
                        numColumns={2}
                        data={this.state.misteries}
                        keyExtractor={(item) => {
                            item.nombre
                            console.log(item);
                        }}
                        renderItem={(item) => <MisteryDetail />}
                    />
                </View>
            );
        }
        else {
            return (
                <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', marginBottom: 50 }}>
                    <ActivityIndicator size='large' color="#36175E" />
                </View>

            );
        }
    }
}

export { Home };