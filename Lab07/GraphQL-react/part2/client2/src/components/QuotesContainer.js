import React from 'react';
import QuoteItem from './QuoteItem';
import ApiService from '../ApiService';


class QuotesContainer extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            quotes: [],
            quote: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
      };

    async componentDidMount () {
        const quotes = await ApiService.getQuotes();
        this.setState({quotes});
    }

    handleDelete = async (params) => {
        await ApiService.deleteQuote(params);
        await this.componentDidMount();
    }

    handleUpdate = async (params) => {
        await ApiService.updateQuote(params);
        await this.componentDidMount();
    }

    handleCreate = async (params) => {
        await ApiService.addQuote(params);
        await this.componentDidMount();
    }

    render () {
        return (
            <div className="quotes_container">
                <form onSubmit={() => {this.handleCreate({quote: this.state.quote})}} >
                    <label>
                        Quote:
                        <input type="text" name="quote" value={this.state.quote} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Create" />
                </form>
                {this.state.quotes.map((quote, index) => {
                    return <QuoteItem key={index} {...quote} deleteHandler={this.handleDelete} updateHandler={this.handleUpdate} />
                })}
            </div>
        )
    }
}

export default QuotesContainer;