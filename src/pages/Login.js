//@flow
import React, {Component} from 'react';
import Token from '../helpers/token';
type Props = {
  onLogin: (boolean) => void,
};
type State = {
  inputName: string,
  inputPassword: string,
};
export default class Home extends Component<Props, State> {
  state = {
    inputName: '',
    inputPassword: '',
  };
  render() {
    let {inputName, inputPassword} = this.state;
    let {onLogin} = this.props;
    return (
      <div>
        <label>Name</label>
        <input
          type="text"
          value={inputName}
          onChange={(event) => this._changeInputName(event.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={inputPassword}
          onChange={(event) => this._changeInputPassword(event.target.value)}
        />
        <input
          type="button"
          value="LOG IN"
          onClick={() => {
            Token.saveToken(inputName + inputPassword);
            console.log(this.props);
            onLogin();
            this.props.history.push('/');
          }}
        />
      </div>
    );
  }
  _changeInputName = (newValue) => {
    this.setState({inputName: newValue});
  };
  _changeInputPassword = (newValue) => {
    this.setState({inputPassword: newValue});
  };
}
