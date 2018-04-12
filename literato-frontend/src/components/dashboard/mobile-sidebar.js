import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { slide as Menu } from 'react-burger-menu'

class MobileSidebar extends Component {
  render() {
    return (
      <Menu width={'200px'}>
        <Link to="/dashboard">
          <p>My Dashboard</p>
        </Link>
        <Link to="/profile">
          <p>My Collection</p>
        </Link>
        <Link to="/make-trades">
          <p>Make Trades</p>
        </Link>
      </Menu>
    )
  }
}
export default MobileSidebar
