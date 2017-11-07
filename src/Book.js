import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static PropTypes = {
		book: PropTypes.object.isRequired,
    shelf:  PropTypes.object.isRequired,
    onUpdateShelf:  PropTypes.func.isRequired
	}

  render() {
    const {book, shelf, onUpdateShelf} = this.props

    return(
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`
            }}/>
            <div className="book-shelf-changer">
              <select value={shelf} onChange={(event) => onUpdateShelf(book, event.target.value)}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {("authors" in book) && book.authors.map((author) => <div key={author} className="book-authors">{author}</div>)}
        </div>
      </li>
    )
  }
}
export default Book
