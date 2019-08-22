import React from 'react';
import Dashboard from 'dashboard/Dashboard';
import Onepirate from 'onepirate/Home';
import SignIn from 'onepirate/SignIn';
import SignUp from 'onepirate/SignUp';
import ForgotPassword from 'onepirate/ForgotPassword';
import PrivateRoute from 'components/PrivateRoute';
// import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useState } from 'react';

// THEME
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from 'theme/muiTheme';

const hist = createBrowserHistory();

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [studentID, setStudentID] = useState(0);

  return (
    <div className="App">
      {/* <MuiThemeProvider theme={muiTheme}> */}
        <Router history={hist}>
          <Switch>
            <PrivateRoute path="/admin" component={Dashboard} authenticated={authenticated} studentID={studentID} />
            <Route path="/home" component={Onepirate} />
            <Route path="/signIn" render={(props) => <SignIn {...props} history={hist} setAuthenticated={setAuthenticated} setGlobalStudentID={setStudentID} />} />
            <Route path="/signUp" render={(props) => <SignUp {...props} history={hist} setAuthenticated={setAuthenticated} setGlobalStudentID={setStudentID} />} />
            <Route path="forgotPassword" component={ForgotPassword} />
            <Redirect from="/" to="/home/" />
          </Switch>
        </Router>
      {/* </MuiThemeProvider> */}
    </div>
  );
}

export default App;
