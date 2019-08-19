import React from 'react';
import Dashboard from './dashboard/Dashboard';
import Onepirate from './onepirate/Home';
import SignIn from './onepirate/SignIn';
import SignUp from './onepirate/SignUp';
import ForgotPassword from './onepirate/ForgotPassword';
import PrivateRoute from './components/PrivateRoute';
// import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from 'react';

// THEME
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/muiTheme';

const hist = createBrowserHistory();

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      <MuiThemeProvider theme={muiTheme}>
        <Router history={hist}>
          <Switch>
            <PrivateRoute authenticated={authenticated} path="/admin" component={Dashboard} />
            <Route path="/home" component={Onepirate} />
            <Route path="/signIn" render={(props) => <SignIn {...props} history={hist} setAuthenticated={setAuthenticated} />} />
            <Route path="/signUp" render={(props) => <SignUp {...props} history={hist} setAuthenticated={setAuthenticated} />}  />
            <Route path="forgotPassword" component={ForgotPassword} />
            <Redirect from="/" to="/home/" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
