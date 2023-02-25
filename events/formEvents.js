import { createAuthor, getAuthors, updateAuthor } from '../api/authorData';
import { createBook, getBooks, updateBook } from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';

const formEvents = () => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const payload = { // order of payload does not matter
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
      };

      createBook(payload).then(({ name }) => {
        const patchPayLoad = { firebaseKey: name }; // "name" comes from Postman when patching - pulling the key value for "name" out of the object to send it to the firebaseKey

        updateBook(patchPayLoad).then(() => {
          getBooks().then(showBooks);
        });
      });
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        author_id: document.querySelector('#author_id').value,
        sale: document.querySelector('#sale').checked,
        firebaseKey,
      };
      console.warn('CLICKED UPDATE BOOK', e.target.id);
      updateBook(payload).then(() => {
        getBooks().then(showBooks);
      });
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const payload = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
      };

      createAuthor(payload).then(({ name }) => {
        const patchPayLoad = { firebaseKey: name };

        updateAuthor(patchPayLoad).then(() => {
          getAuthors().then(showAuthors);
        });
      });
      console.warn('CLICKED SUBMIT AUTHOR');
    }

    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const payload = {
        email: document.querySelector('#email').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        firebaseKey,
      };
      console.warn('CLICKED UPDATE AUTHOR', e.target.id);
      updateAuthor(payload).then(() => {
        getAuthors().then(showAuthors);
      });
    }
  });
};

export default formEvents;
