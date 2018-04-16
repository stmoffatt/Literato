import React, { Component } from 'react'
import { Row, Col, FormControl, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

var apiUrl
if (process.env.NODE_ENV === 'production') {
  apiUrl = ''
} else {
  apiUrl = 'http://localhost:3000'
}

const mapComponentToProps = store => {
  return {
    user: store.user.currentUser,
    userError: store.user.error,
  }
}

export default connect(mapComponentToProps)(
  class DataBaseSearch extends Component {
    constructor(props) {
      super(props)
      this.state = {
        apiUrl: apiUrl,
        searchText: '',
        dbBooks: [],
      }
    }

    handleKeyPress(event) {
      let self = this
      let value = event.target.value
      this.setState({ searchText: value })
      if (event.key === 'Enter' && value !== '') {
        self.search()
      }
    }

    search() {
      let self = this
      if (self.state.searchText !== '') {
        fetch(`${self.state.apiUrl}/dbsearch/${self.state.searchText}`, {
          method: 'GET',
          dataType: 'json',
        })
          .then(rawResponse => {
            return rawResponse.json()
          })
          .then(jsonresp => {
            this.setState({
              dbBooks: jsonresp,
            })
          })
      }
    }

    handleTradeRequest(params) {
      let self = this
      fetch(`${self.state.apiUrl}/requests/pending`, {
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })
        .then(rawResponse => {
          return rawResponse.json()
        })
        .then(parsedResponse => {
          if (parsedResponse.errors) {
            this.setState({ errors: parsedResponse.errors })
          } else {
            const request = Object.assign([], this.state.request)
            request.push(parsedResponse.request)
            this.setState({
              request: request,
              errors: null,
              tradeSuccess: true,
            })
          }
        })
    }

    handleSubmit(event) {
      var trade = {
        user1Id: this.props.user.id,
        user2Id: this.state.dbBooks[0].userId,
        book2Id: this.state.dbBooks[0].id,
      }
      event.preventDefault()
      this.handleTradeRequest(trade)
      document.getElementById('submitted').innerHTML = 'Trade Request Submitted'
    }

    render() {
      var list = this.state.dbBooks.map((books, index) => {
        return (
          <li key={index}>
            <div>
              <h4 className="user-book-title">{books.title}</h4>
              <h5 className="user-book-authors">{books.authors}</h5>
              <h6 className="user-book-owner">Owned by {books.username}</h6>
              <Button onClick={this.handleSubmit.bind(this)} className="trade-book btn btn-default" id="submitted">
                Trade Book
              </Button>
            </div>
          </li>
        )
      })

      return (
        <div className="main">
          <Row>
            <Col md={10}>
              <FormControl type="text" id="searchText" placeholder="Search" onChange={this.handleKeyPress.bind(this)} />
              <Button id="search" bsStyle="primary" onClick={this.search.bind(this)}>
                {' '}
                Search
              </Button>
              <ol>{list}</ol>
            </Col>
          </Row>
        </div>
      )
    }
  },
)
