import React, { Component } from "react";

export default class LoadingSpinner extends Component {
  render() {
    let style = {};

    if (this.props.size) {
      style = {
        height: this.props.size + "px",
        width: this.props.size + "px",
        fontSize: this.props.size + "px"
      };
    }

    return (
      <div className="loading-spinner" style={style}>
        <span className="fa fa-cog" />
      </div>
    );
  }
}
