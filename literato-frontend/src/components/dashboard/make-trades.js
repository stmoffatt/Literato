import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Header from './header'
import Sidebar from './sidebar'
import DataBaseSearch from '../database-search.js'
import MobileSidebar from './mobile-sidebar'
import Extend from './extend'

class MakeTrades extends Component {
  handleLogout() {
    this.props.onSubmit()
  }

  render() {
    return (
      <div>
        <MobileSidebar />
        <Header />
        <Button bsStyle="link" className="sign-out-link" onClick={this.handleLogout.bind(this)}>
          Sign Out
        </Button>
        <Sidebar />
        <Extend />
        <DataBaseSearch />
      </div>
    )
  }
}

export default MakeTrades
