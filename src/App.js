// @flow

import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Link,
  NavLink,
  Redirect,
} from 'react-router-dom';

import {About, Home, Contact, NotFound, User, Login} from './pages';
import {BASEURL} from './constants/system';

import Token from './helpers/token';

function Navigator() {
  return (
    <ul>
      <li>
        <NavLink to="/" activeStyle={{color: 'green'}}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={`${BASEURL}/about`}>About</NavLink>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>

      <li>
        <Link to="/user/Filbert">Username 1</Link>
      </li>
      <li>
        <Link to="/user/Alvin">Username 2</Link>
      </li>
    </ul>
  );
}

type State = {
  isLogin: boolean,
};
class App extends React.Component<Object, State> {
  state = {
    isLogin: false,
  };

  componentDidMount() {
    if (Token.getToken()) {
      this.setState({isLogin: Token.getToken() != null});
    }
  }
  _changeLoginState = () => {
    if (Token.getToken() != null) {
      this.setState({isLogin: true});
    } else {
      this.setState({isLogin: false});
    }
  };

  render() {
    let {isLogin} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route
                path="/login"
                render={(props) => {
                  return <Login {...props} onLogin={this._changeLoginState} />;
                }}
                exact
              />
              <Route path={`${BASEURL}/about`} component={About} />
              <Route path="/contact/" component={Contact} />
              <Route
                path="/user/:username"
                render={(props) => {
                  return isLogin ? (
                    <User username={props.match.params.username} />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route component={NotFound} />
            </Switch>
            {!isLogin ? (
              ''
            ) : (
              <input
                type="button"
                value="LOG OUT"
                onClick={() => {
                  Token.removeToken();
                  this._changeLoginState();
                }}
              />
            )}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
