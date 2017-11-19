import React from 'react';

import FileList from './components/FileList';
import { remote } from './services/electron';

import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <FileList path={remote.process.env.HOME} />
  </div>
);

export default App;
