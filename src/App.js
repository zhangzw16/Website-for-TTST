import React from 'react';
import Dashboard from './dashboard/Dashboard';
import logo from './logo.svg';
import './App.css';

// THEME
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <MuiThemeProvider theme={muiTheme}>
        <Dashboard />
      </MuiThemeProvider>
    </div>
  );
}

export default App;
