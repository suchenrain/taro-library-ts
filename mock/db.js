var Mock = require('mockjs')
var BookFactory = require('./factory/book')

var newBooks = BookFactory.randomMulti();
var hotBooks = BookFactory.randomMulti();
var recommendBooks = BookFactory.randomMulti();
var allBooks = Mock.Random.shuffle([
  ...newBooks,
  ...hotBooks,
  ...recommendBooks
]);


module.exports = {
  books: allBooks,
  "books-new": newBooks,
  "books-hot": hotBooks,
  "books-recommend": recommendBooks
}
