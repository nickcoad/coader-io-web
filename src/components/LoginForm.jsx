import React, { Component } from "react";
import Showdown from "showdown";
import Button from "./forms/Button";
import Api from "../services/Api";
import TextInput from "./forms/TextInput";

export default class LoginForm extends Component {
  converter = Showdown.Converter;
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleLoginClick = () => {
    const api = new Api();
    const { handleLogin } = this.props;

    api
      .authenticate(this.state.username, this.state.password)
      .then(handleLogin);
  };

  handleUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="login-form">
        <TextInput onChange={this.handleUsernameChange} />
        <TextInput isPassword={true} onChange={this.handlePasswordChange} />
        <Button label="Login" onClick={this.handleLoginClick} />
      </div>
    );
  }
}
