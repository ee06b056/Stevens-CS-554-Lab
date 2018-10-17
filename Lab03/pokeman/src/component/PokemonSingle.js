import React from 'react';
import axios from 'axios';

class PokemonSingle extends React.Component {
    constructor (props) {
        super(props);
        const id = this.props.match.params.id;
        this.state = {
            loaded: false
        };
        axios.get('https://pokeapi.co/api/v2/pokemon/' + id + '/').then((response) => {
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
            <div className="PokemonSingle">
                <h1>{this.data.name}</h1>
                <h2>Order: {this.data.order}</h2>
                <h2>Weight: {this.data.weight}</h2>
                <h2>Abilities:</h2>
                <ul>{this.data.abilities.map((a) => <li key={a.ability.url}>{a.ability.name}</li>)}</ul>
                
            </div>
        );
    }
}

export default PokemonSingle;