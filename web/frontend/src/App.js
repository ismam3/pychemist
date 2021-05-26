import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React,{useState} from 'react';
import Home from './components/Home';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
