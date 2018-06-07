import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import MisteryDetail from './MisteryDetail';


class MisteryList extends Component {

    state = { misteries: [] };

    componentWillMount() {
        return this.state.misteries.map(mistery =>
            <MisteryDetail key={mistery.userID} image={image} />);
    }

    renderMisteries() {

    }

    render() {

        return (
            <ScrollView>
                {this.renderMisteries()}
            </ScrollView>
        );
    }

}

export default MisteryList;