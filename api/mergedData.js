// for merged promises

import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object (firebaseKey for object)
      .then((authorObject) => resolve({ ...bookObject, authorObject })); // resolve both promises and use spread operator to include bookObject and authorObject (takes key values pairs for objects and copy them in)
  }).catch(reject);
});

// GET AUTHOR
// Create an object that has book data and an object named authorObject
const getAuthorsDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey)
      .then((bookObject) => resolve({ ...authorObject, bookObject }));
  }).catch(reject);
});

const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getBookDetails,
  getAuthorsDetails,
  deleteAuthorBooksRelationship,
};
