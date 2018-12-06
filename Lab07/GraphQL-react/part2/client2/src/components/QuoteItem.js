import React from 'react';

class QuoteItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            id: this.props.id,
            quote: this.props.quote
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});        
    }

    render () {
        return (
            <div>
                <p>id: {this.props.id}</p>
                <p>quote: {this.props.quote}</p>
                <form onSubmit={() => {this.props.updateHandler(this.state)}} >
                    <label>
                        Quote:
                        <input type="text" name="quote" value={this.state.quote} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Update" />
                </form>
                <button onClick={() => {this.props.deleteHandler({id: this.props.id})}}>
                    Delete
                </button>
            </div>
        );
    }
}

export default QuoteItem;