import React, { Component } from 'react'

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo-holder">
          <img className="app-logo" alt="Literato logo" src="./literato-logo.png" />
        </div>
      </header>
    )
  }
}

export default Header
