import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground } from 'react-native';
import axios from 'axios';
import MisteryDetail from './MisteryDetail';

class MisteryList extends Component {
    state = { misterios: [] };

    componentWillMount() {
        axios.get('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => this.setState({ misterios: response.data }));
    }

    renderMisterios() {
        return this.state.misterios.map(misterio =>
            <MisteryDetail key={misterio.id} misterio={misterio} />
        );
    }

    render() {
        return (
            <ImageBackground source={require('../assets/Gradient.png')} style={style.backgroundStyle}>
                <ScrollView>
                    {this.renderMisterios()}
                </ScrollView>
            </ImageBackground>
        );
    }

}

const style = {
    backgroundStyle: {
        flex: 1,
        marginBottom: 50
    }
};

export default MisteryList;