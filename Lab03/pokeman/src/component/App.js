import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Clock from './Clock';
import NavBar from './NavBar';
import PokemonList from './PokemonList';
import PokemonSingle from './PokemonSingle';
import BerriesList from './BerriesList';
import BerrySingle from './BerrySingle';
import MachinesList from './MachinesList';
import MachineSingle from './MachineSingle';

import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to My Pokemon Website</h1>
        </header>
        <Clock />

        <Router>
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/pokemon/page/:page" component={PokemonList} />
              <Route exact path="/pokemon/:id" component={PokemonSingle} />
              <Route exact path="/berries/page/:page" component={BerriesList} />
              <Route exact path="/berry/:id" component={BerrySingle} />
              <Route exact path="/machines/page/:page" component={MachinesList} />
              <Route exact path="/machine/:id" component={MachineSingle} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

function NoMatch() {
  return (
    <h1 className="NoMatch">404 Not found</h1>
  );
}

export default App;
