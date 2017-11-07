import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Home from './Home'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      booksShelf: {},
      searchBooks: []
    }
    this.updateShelf = this.updateShelf.bind(this)
    this.updateBooksShelf = this.updateBooksShelf.bind(this)
    this.addBook = this.addBook.bind(this)
    this.updateSearchBooks = this.updateSearchBooks.bind(this)
    this.initializeSearchBooks = this.initializeSearchBooks.bind(this)
  }

  componentDidMount() {
		BooksAPI.getAll().then((books) => {
      let booksShelfLocal = {}
      books.forEach((book) => (booksShelfLocal[book.id] = "currentlyReading"))
			this.setState({
        books:books,
        booksShelf:booksShelfLocal
      })
		})
	}

  updateBooksShelf(bookId, shelf) {
    let booksShelfLocal = this.state.booksShelf
    booksShelfLocal[bookId] = shelf
    this.setState({booksShelf:booksShelfLocal})
  }

  addBook(book) {
    this.setState(state => ({
      books: state.books.concat([book])
    }))
  }

  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((currState) => {
      if(!(this.state.books.includes(book))) {
        this.addBook(book)
      }
      if(shelf === "none") this.updateBooksShelf(book.id, "none")
      currState.currentlyReading.forEach((id) => this.updateBooksShelf(id, "currentlyReading"))
      currState.wantToRead.forEach((id) => this.updateBooksShelf(id, "wantToRead"))
      currState.read.forEach((id) => this.updateBooksShelf(id, "read"))
    })
  }

  updateSearchBooks(query) {
    BooksAPI.search(query, 20).then((books) => {
      this.setState({searchBooks:books})
    })
  }

  initializeSearchBooks() {
    this.setState({searchBooks:[]})
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Home
            books={this.state.books}
            booksShelf={this.state.booksShelf}
            onUpdateShelf={this.updateShelf}
            onInitializeSearchBooks={this.initializeSearchBooks}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            searchBooks={this.state.searchBooks}
            booksShelf={this.state.booksShelf}
            onUpdateShelf={this.updateShelf}
            onUpdateSearchBooks={(query) => {
              this.updateSearchBooks(query)
            }}
					/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
