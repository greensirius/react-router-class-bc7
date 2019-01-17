// @flow

import React from 'react';
import {BrowserRouter, Route, Switch, Link, NavLink, Redirect} from 'react-router-dom';

import {About, Home, Contact, NotFound, User} from './pages';
import {BASEURL} from './constants/system';

import {setToken, getToken, removeToken} from './helpers/token';

function Navigator() {
  return (
    <ul>
      <li>
        <NavLink to="/" exact activeStyle={{color: 'green'}}>
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
  username: string,
  password: string,
  activeToken: ?string,
};
class App extends React.Component<{}, State> {
  state = {
    isLogin: false,
    username: '',
    password: '',
    activeToken: null,
  };

  componentDidMount() {
    if (getToken() === 'admin') this.setState({isLogin: true, activeToken: 'admin'});
  }

  render() {
    const {isLogin, username, password} = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Navigator />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path={`${BASEURL}/about`} component={About} />
              <Route path="/contact/" component={Contact} />
              <Route
                path="/user/:username"
                render={(props) =>
                  isLogin ? <User username={props.match.params.username} /> : <Redirect to="/" />
                }
              />
              <Route component={NotFound} />
            </Switch>
            {!isLogin ? (
              <div>
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => this.setState({username: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="password"
                  onChange={(e) => this.setState({password: e.target.value})}
                />
              </div>
            ) : null}
            <input
              id="sessionBtn"
              type="button"
              value={isLogin ? 'LOG-OUT' : 'LOG-IN'}
              onClick={() => (!isLogin ? this._logIn(username, password) : this._logOut())}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }

  _logIn = (username, password) => {
    let isLoginSuccess = setToken(username, password);
    isLoginSuccess
      ? this.setState({isLogin: true, username: '', password: '', activeToken: getToken()})
      : this.setState({isLogin: false, username: '', password: ''});
  };

  _logOut = () => {
    removeToken();
    this.setState({isLogin: false, username: '', password: '', activeToken: null});
  };
}

export default App;
