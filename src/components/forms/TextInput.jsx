import React, { Component } from "react";

export default class TextInput extends Component {
  render() {
    let { onChange, isPassword } = this.props;

    return (
      <input type={isPassword ? "password" : "text"} className="input--text" onChange={onChange}/>
    );
  }
}
