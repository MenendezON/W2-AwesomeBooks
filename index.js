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
const contain = document.querySelector('.list-book');

const addBook = (book) => {
  bookList.add(book);
};

const form = document.querySelector('form');

const display = () => {
  const books = bookList.getAll();
  contain.innerHTML = '';
  const table = document.createElement('table');
  // header
  const tr = document.createElement('tr');
  const th1 = document.createElement('th');
  th1.textContent = '#';
  const th2 = document.createElement('th');
  th2.textContent = 'Title';
  const th3 = document.createElement('th');
  th3.textContent = 'Author';
  const th5 = document.createElement('th');
  th5.textContent = 'Actions';
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th5);
  table.appendChild(tr);
  // body
  books.forEach((book, i) => {
    const tr1 = document.createElement('tr');
    const th11 = document.createElement('th');
    th11.textContent = i + 1;
    const th12 = document.createElement('td');
    th12.textContent = book.title;
    const th13 = document.createElement('td');
    th13.textContent = book.author;
    const th15 = document.createElement('td');
    th15.innerHTML = `
    <a href="#" onclick="removeBook(${i})">Remove</a>`;
    tr1.appendChild(th11);
    tr1.appendChild(th12);
    tr1.appendChild(th13);
    tr1.appendChild(th15);
    table.appendChild(tr1);
  });
  contain.appendChild(table);
};
/* eslint-disable no-unused-vars */
const removeBook = (index) => {
  bookList.remove(index);
  display();
};

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