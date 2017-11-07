import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBooks extends Component {
  static PropTypes = {
		searchBooks: PropTypes.object.isRequired,
    booksShelf:  PropTypes.object.isRequired,
    onUpdateShelf:  PropTypes.func.isRequired,
    onUpdateSearchBooks: PropTypes.func.isRequired
	}

  renderSearchBook(book) {
    return (
      <Book
        key={book.id}
        book={book}
        shelf={(book.id in this.props.booksShelf) ? this.props.booksShelf[book.id] : "none"}
        onUpdateShelf={this.props.onUpdateShelf}
        />
      )
  }

  render() {
    const {searchBooks, onUpdateSearchBooks} = this.props
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
               type="text"
               placeholder="Search by title or author"
               onChange={(event) => onUpdateSearchBooks(event.target.value)}
             />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(searchBooks.length > 0) && searchBooks.map(this.renderSearchBook, this)}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks
