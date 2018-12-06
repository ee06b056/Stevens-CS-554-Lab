import React from 'react';

class QuoteItem extends React.Component {


    render () {
        return (
            <div>
                <p>id: {this.props.id}</p>
                <p>quote: {this.props.quote}</p>

            </div>
        );
    }
}

export default QuoteItem;