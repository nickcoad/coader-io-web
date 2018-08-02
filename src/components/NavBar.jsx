import React, { Component } from "react";
import Button from "./forms/Button";
import LoginForm from "./LoginForm";

export default class NavBar extends Component {
  render() {
    let { isLoggedIn, handleLogin, handleLogout } = this.props;

    return (
      <div className="nav-bar">
        {isLoggedIn && (
          <Button label="Logout" onClick={handleLogout} />
        )}
        {!isLoggedIn && (<LoginForm handleLogin={handleLogin} />)}
      </div>
    );
  }
}
