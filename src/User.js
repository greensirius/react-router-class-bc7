//@ flow
import React from "react";

class User extends React.Component {
  state = {
    username: "Juan"
  };
  render() {
    let { username } = this.state;
    return <span>${username}</span>;
  }
}
