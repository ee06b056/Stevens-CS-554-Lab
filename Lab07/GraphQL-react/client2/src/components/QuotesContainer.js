import React from 'react';
import QuoteItem from './QuoteItem';
import ApiService from '../ApiService';


class QuotesContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quotes: []
        }
    }

    async componentDidMount () {
        
    }

    render () {
        return (
            <div className="quotes_container">
                {this.state.quotes.map((quote) => {
                    return <QuoteItem {...quote} />
                })}
                <p>addForm</p>
                <p>quotes list</p>
            </div>
        )
    }
}

export default QuotesContainer;