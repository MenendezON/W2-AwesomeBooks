let books = [];
const { localStorage } = window;

const display = () => {
  const bookList = document.querySelector('.list-book-body');
  bookList.innerHTML = '';
  const data = localStorage.getItem('books');
  if (data) {
    books = JSON.parse(data);
    // console.log(JSON.parse(localStorage.getItem("books")));
  } else {
    books = [];
  }
  for (let i = 0; i < books.length; i += 1) {
    const bookItem = `
      <div class="book-details">
        <p class="title">${books[i].title}</p>
        <p class="author">${books[i].author}</p>
      </div>
      <button onclick="removeBook(event)">Remove</button>
`;

    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');
    bookContainer.innerHTML = bookItem;
    bookList.appendChild(bookContainer);
  }
};

const addBook = (book) => {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
  display();
};

/* eslint-disable no-unused-vars */
const removeBook = (event) => {
  const btn = event.target;
  const title = btn.parentElement.getElementsByClassName('title')[0].innerText;
  const author = btn.parentElement.getElementsByClassName('author')[0].innerText;
  const obj = {
    title,
    author,
  };

  const newBooks = books.filter((item) => item.title !== obj.title && item.author !== obj.author);
  localStorage.setItem('books', JSON.stringify(newBooks));
  display();
};

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = {
    title,
    author,
  };
  addBook(book);

  form.reset();
});

window.addEventListener('load', () => {
  const data = localStorage.getItem('books');
  if (data) {
    books = JSON.parse(data);
    // console.log(JSON.parse(localStorage.getItem("books")));
  } else {
    books = [];
  }

  display();
});
