function Carousel() {
    this.items = [];
    this.index = 0;
    this.leftButton = null;
    this.rightButton = null;

    this.active = function() {
        return this.items[this.index];
    }

    this.next = function() {
        if (this.index === this.items.length - 1) {
            this.index = 0;
        } else {
            this.index += 1;
        }
        return this; /* Allows next to be chained */
    }

    this.previous = function() {
        if (this.index === 0) {
            this.index = this.items.length - 1;
        } else {
            this.index -= 1;
        }
        return this; /* Allows previous to be chained */
    }
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`
    }
}

function displayInfo(book) {
    let title = document.querySelector(".book-cover__title");
    let author = document.querySelector(".book-cover__author");
    let pages = document.querySelector(".book-info__pages");
    let read = document.querySelector(".book-info__read");

    title.textContent = book.title;
    author.textContent = `by ${book.author}`;
    pages.textContent = `This book contains ${book.pages} pages`;
    read.textContent = `${book.read ? "You have already read this book" : "You have not yet read this book"}`;
}

let book1 = new Book("My Story", "Me", 69, true);
let book2 = new Book("Your Story", "You", 420, false);
let book3 = new Book("Their Story", "Them", 999, false);
const carousel = new Carousel();
carousel.items.push(book1);
carousel.items.push(book2);
carousel.items.push(book3);

const addButton = document.querySelector(".add-container__button");
const addDialog = document.querySelector("dialog");
const textTitle = document.querySelector("#title");
const textAuthor = document.querySelector("#author");
const numPages = document.querySelector("#pages");
const boolRead = document.querySelector("#read");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
let dialogValues = {title: null, author: null, pages: null, read: null};

carousel.leftButton = document.querySelector(".carousel__left");
carousel.rightButton = document.querySelector(".carousel__right");

console.log(carousel);

displayInfo(carousel.active());

carousel.leftButton.addEventListener("click", () => {
    carousel.previous();
    displayInfo(carousel.active());
})

carousel.rightButton.addEventListener("click", () => {
    carousel.next();
    displayInfo(carousel.active());
})

addButton.addEventListener("click", () => {
    addDialog.showModal();
    let newBook = new Book(null, null, null, null);
})

addDialog.addEventListener("close", () => {
    dialogValues = {title: null, author: null, pages: null, read: null};
})

confirmBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let newBook = new Book(dialogValues.title, dialogValues.author, dialogValues.pages, dialogValues.read);
    carousel.items.push(newBook);
    addDialog.close();
})

cancelBtn.addEventListener("click", () => {
    addDialog.close();
})

textTitle.addEventListener("change", () => {
    dialogValues.title = textTitle.value;
})

textAuthor.addEventListener("change", () => {
    dialogValues.author = textAuthor.value;
})

numPages.addEventListener("change", () => {
    dialogValues.pages = Number(numPages.value);
})

boolRead.addEventListener("change", () => {
    dialogValues.read = boolRead.checked;
})