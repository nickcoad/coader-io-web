import React, { Component } from "react";

export default class Button extends Component {
  render() {
    let { label, onClick, appearance } = this.props;
    let classes = "button ";

    if (appearance === "danger") classes += "button--danger";

    return (
      <a className={classes} onClick={onClick}>
        {label}
      </a>
    );
  }
  constructor(props) {
    super(props);
  }
}
