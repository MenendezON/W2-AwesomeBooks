const contain = document.querySelector('.list-book-body');
class BookList {
  bookList;

  constructor() {
    this.getAll();
  }

  add(nbook) {
    this.bookList.push(nbook);
    this.setLocalStorage(this.bookList);
  }

  remove(index) {
    const filtered = this.bookList.filter((book) => book.title !== this.bookList[index].title);
    localStorage.setItem('books', JSON.stringify(filtered));
  }

  setLocalStorage = (newBooks) => localStorage.setItem('books', JSON.stringify(newBooks));

  getAll() {
    const data = localStorage.getItem('books');
    if (data) {
      this.bookList = JSON.parse(data);
    } else {
      this.bookList = [];
    }
  }

  display = () => {
    // const books = bookList.getAll();

    contain.innerHTML = '';
    let currentColor = '#dddddd';
    this.bookList.forEach((book, i) => {
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
}

const bookList = new BookList();
const rm = document.querySelectorAll('#remove');

const form = document.querySelector('form');

const removeBook = (index) => {
  bookList.remove(index);
  bookList.getAll();
  bookList.display();
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
  const newBook = {
    title,
    author,
  };
  bookList.add(newBook);

  bookList.display();
  form.reset();
});

window.addEventListener('load', () => {
  bookList.display();
});