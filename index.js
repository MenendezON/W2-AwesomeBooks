/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookList {
  constructor() {
    this.bookList = [];
    this.localStorage = window.localStorage;
  }

  add(book) {
    if (book) {
      this.bookList.push(book);
      this.localStorage.setItem('books', JSON.stringify(this.bookList));
    }
  }

  remove(index) {
    this.bookList = this.bookList.filter((book) => book.title !== this.bookList[index].title);
    this.localStorage.setItem('books', JSON.stringify(this.bookList));
  }

  getAll() {
    const data = this.localStorage.getItem('books');

    if (data) {
      this.bookList = JSON.parse(data);
    } else {
      this.bookList = [];
    }
    return this.bookList;
  }
}

const bookList = new BookList();
const contain = document.querySelector('.list-book-body');

const addBook = (book) => {
  bookList.add(book);
};

const form = document.querySelector('form');

const display = () => {
  const books = bookList.getAll();

  contain.innerHTML = '';
  let currentColor = '#dddddd';
  books.forEach((book, i) => {
    const bookItem = `
      <div class="book-details">
        <p class="title">"${book.title}" by</p>
        <p class="author">${book.author}</p>
      </div>
      <button id="remove" onclick="removeBook(${i})">Remove</button>
    `;

    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');
    bookContainer.innerHTML = bookItem;
    if (currentColor !== bookContainer.style.backgroundColor) {
      bookContainer.style.backgroundColor = currentColor;
      currentColor = '';
    } else {
      currentColor = '#dddddd';
    }
    contain.appendChild(bookContainer);
  });
};
const rm = document.querySelectorAll('#remove');

const removeBook = (index) => {
  bookList.remove(index);
  display();
};

rm.forEach((x, i) => {
  rm[i].addEventListener('click', () => {
    removeBook(i);
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.elements.title.value;
  const author = form.elements.author.value;
  addBook(new Book(title, author));

  display();
  form.reset();
});

window.addEventListener('load', () => {
  display();
});