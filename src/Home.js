import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Home extends Component {
  static PropTypes = {
		books: PropTypes.object.isRequired,
    booksShelf: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    onInitializeSearchBooks: PropTypes.func.isRequired
	}

  componentDidMount() {
    this.props.onInitializeSearchBooks()
  }

  checkBookState(state) {
    return function(book) {
      return this.props.booksShelf[book.id] === state
    }
  }

  renderBook(book) {
    return (
      <Book
        key={book.id}
        book={book}
        shelf={this.props.booksShelf[book.id]}
        onUpdateShelf={this.props.onUpdateShelf}
        />
      )
  }

  renderSection(stateValuePair, index) {
    return(
      <div key={index}>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{stateValuePair.value}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.books.filter(this.checkBookState(stateValuePair.state), this).map(this.renderBook, this)}
            </ol>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {books} = this.props

    let stateValuePairs = [
      {"state":"currentlyReading","value":"Currently Reading"},
      {"state":"wantToRead","value":"Want to Read"},
      {"state":"read","value":"Read"}
    ]

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {(books.length > 0) && stateValuePairs.map(this.renderSection, this)}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
export default Home
