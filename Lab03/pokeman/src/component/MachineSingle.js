import React from 'react';
import axios from 'axios';

class MachineSingle extends React.Component {
    constructor (props) {
        super(props);
        const id = this.props.match.params.id;
        this.state = {
            loaded: false
        };
        axios.get('https://pokeapi.co/api/v2/machine/' + id + '/').then((response) => {
            this.data = response.data;
            this.setState({
                loaded: true
            });
        }).catch((e) => {
            console.log(e);
        });
    }

    render () {
        return (this.state.loaded && 
            <div className="MachineSingle">
                <h1>{this.data.item.name}</h1>
                <h2>Move: {this.data.move.name}</h2>
                <h2>Version group: {this.data.version_group.name}</h2>
            </div>
        );
    }
}

export default MachineSingle;