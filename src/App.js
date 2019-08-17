import React from 'react';
import Dashboard from './dashboard/Dashboard';
import Onepirate from './onepirate/Home';
import SignIn from './onepirate/SignIn';
import SignUp from './onepirate/SignUp';
// import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// THEME
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

const hist = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={muiTheme}>
        <Router history={hist}>
          <Switch>
            <Route path="/admin" component={Dashboard} />
            <Route path="/home" component={Onepirate} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/signUp" component={SignUp} />
            <Redirect from="/" to="/home/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
