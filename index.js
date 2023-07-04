let books = [];
const contain = document.querySelector('.list-book');
const { localStorage } = window;
const addBook = (book) => {
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
};

const form = document.querySelector('form');
const display = () => {
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

const removeBook = (index) => {
  books = books.filter((book) => book.title !== books[index].title);
  localStorage.setItem('books', JSON.stringify(books));
  display();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = {
    title,
    author,
  };
  addBook(book);

  display();
  form.reset();
});

/* const display = () => {
  for (let i = 0; i < books.length; i += 1) {
    const bookItem = `
      <div class="book-details">
        <p class="title">${books[i].title} </p>
        <p class="author">${books[i].author}</p>
      </div>
      <button onclick="removeBook(${i})">Remove</button>
`;

    const target = document.querySelector('.list-book');
    const h2 = document.createElement('h2');
    target.appendChild(h2);

    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('class', 'book');
    bookContainer.innerHTML = bookItem;
    target.insertAdjacentElement('afterend', bookContainer);
  }
}; */

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
