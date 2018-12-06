import React, { Component } from 'react';
import AppoloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// components
import BookList from './components/BookList.js';

// apollo clent setup
const client = new AppoloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Bo's reading list</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
