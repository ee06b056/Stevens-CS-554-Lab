import React, {Component} from 'react';
import {gql} from 'apollo-boost';

const getBooksQuery = gql`
    {

    }
`;

class BookList extends Component {
    render () {
        return (
            <div>
                <ul className="book-list">
                    <li>Book Name</li>
                </ul>
            </div>
        );
    }
}

export default BookList;