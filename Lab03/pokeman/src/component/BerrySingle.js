import React from 'react';
import axios from 'axios';

class BerrySingle extends React.Component {
    constructor (props) {
        super(props);
        const id = this.props.match.params.id;
        this.state = {
            loaded: false
        };
        axios.get('https://pokeapi.co/api/v2/berry/' + id + '/').then((response) => {
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
            <div className="BerrtSingle">
                <h1>{this.data.name}</h1>
                <h2>Size: {this.data.size}</h2>
                <h2>Smoothness: {this.data.smoothness}</h2>
                <h2>Soil Dryness: {this.data.soil_dryness}</h2>
                <h2>Growth time: {this.data.growth_time}</h2>
            </div>
        );
    }
}

export default BerrySingle;