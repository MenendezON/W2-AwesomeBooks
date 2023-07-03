let books = [];
let localStorage = window['localStorage'];
const addBook = (book) => {
  books.push(book);
  localStorage.setItem("books", JSON.stringify(books));
  
}

const removeBook = (event) => {
  // books = books.filter(item => item!== book)

  let btn = event.target;
  let title = btn.parentElement.getElementsByClassName("title")[0].innerText;
  let author = btn.parentElement.getElementsByClassName("author")[0].innerText;
  let obj = {
    title: title,
    author: author
  }

  // books = books.filter(item => item!== obj);
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = form.elements['title'].value;
  let author = form.elements['author'].value;
  let book = {
    title: title,
    author: author
  }
  addBook(book);

    let target = document.querySelector(".list-book h2");


      let book_item = `
        <div class="book-details">
          <p class="title">${books[books.length-1].title}</p>
          <p class="author">${books[books.length-1].author}</p>
        </div>
        <button onclick="removeBook(event)">Remove</button>
  `;

    let bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", "book");
    bookContainer.innerHTML = book_item;
    target.insertAdjacentElement("afterend", bookContainer);
  form.reset();
});



window.addEventListener("load", () => {
  const data = localStorage.getItem("books");
  if (data) {
    books = JSON.parse(data);
    // console.log(JSON.parse(localStorage.getItem("books")));
  } else {
    books = [];
  }

  display();
  console.log(books);
});


const display = () => {
  for (let i = 0; i < books.length; i += 1) {
    let book_item = `
      <div class="book-details">
        <p class="title">${books[i].title}</p>
        <p class="author">${books[i].author}</p>
      </div>
      <button onclick="removeBook(event)">Remove</button>
`;

    let target = document.querySelector(".list-book h2");
    let bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", "book");
    bookContainer.innerHTML = book_item;
    target.insertAdjacentElement("afterend", bookContainer);
    console.log(books);
  }
}