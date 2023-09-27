class Carousel {
    constructor() {
        this.items = [];
        this.index = 0;
        this.leftButton = null;
        this.rightButton = null;
    }

    active = function () {
        return this.items[this.index];
    };

    next = function () {
        if (this.index === this.items.length - 1) {
            this.index = 0;
        } else {
            this.index += 1;
        }
        return this; /* Allows next to be chained */
    };

    previous = function () {
        if (this.index === 0) {
            this.index = this.items.length - 1;
        } else {
            this.index -= 1;
        }
        return this; /* Allows previous to be chained */
    };

    remove = function (index) {
        return this.items.splice(index, 1);
    };

}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
    };
}

function displayInfo() {
    let carouselIndex = document.querySelector(".carousel-index");
    let title = document.querySelector(".book-cover__title");
    let author = document.querySelector(".book-cover__author");
    let pages = document.querySelector(".book-info__pages");
    let read = document.querySelector(".book-info__read");

    if (carousel.active()) {
        carouselEmpty.classList.add("hidden");
        carouselIndex.textContent = `${carousel.index + 1} / ${carousel.items.length}`
        title.textContent = carousel.active().title;
        author.textContent = `by ${carousel.active().author}`;
        pages.textContent = `This book contains ${carousel.active().pages} pages`;
        read.textContent = `${carousel.active().read ? "You have already read this book" : "You have not yet read this book"}`;
        carousel.active().read ? toggleRead.firstChild.src = "check.svg" : toggleRead.firstChild.src = "close.svg";
    } else {
        carouselEmpty.classList.remove("hidden");
    }
}

let book1 = new Book("My Story", "Me", 69, true);
let book2 = new Book("Your Story", "You", 420, false);
let book3 = new Book("Their Story", "Them", 999, false);

const carousel = new Carousel();

carousel.items.push(book1);
carousel.items.push(book2);
carousel.items.push(book3);

const carouselEmpty = document.querySelector(".carousel__empty");
const removeButton = document.querySelector(".remove-button");
const addButtons = document.querySelectorAll(".add-button");

const addDialog = document.querySelector("dialog");
const textTitle = document.querySelector("#title");
const textAuthor = document.querySelector("#author");
const numPages = document.querySelector("#pages");
const boolRead = document.querySelector("#read");
const confirmBtn = document.querySelector("#confirm-btn");
const cancelBtn = document.querySelector("#cancel-btn");
const dialogForm = document.querySelector("form");

let toggleRead = document.querySelector(".toggle-button");

carousel.leftButton = document.querySelector(".carousel__left");
carousel.rightButton = document.querySelector(".carousel__right");

// Start of script

displayInfo();

carousel.leftButton.addEventListener("click", () => {
    carousel.previous();
    displayInfo();
})

carousel.rightButton.addEventListener("click", () => {
    carousel.next();
    displayInfo();
})

let dialogValues = {title: null, author: null, pages: null, read: false};

addButtons.forEach((addButton) => {
    addButton.addEventListener("click", () => {
        addDialog.showModal();
        let newBook = new Book(null, null, null, null);
    })
})

addDialog.addEventListener("close", () => {
    textTitle.value = "";
    textAuthor.value = "";
    numPages.value = "";
    boolRead.checked = false;
    dialogValues = {title: null, author: null, pages: null, read: false};
})

dialogForm.addEventListener("submit", () => {
    let newBook = new Book(dialogValues.title, dialogValues.author, dialogValues.pages, dialogValues.read);
    carousel.items.push(newBook);
    carousel.index = carousel.items.length - 1;
    displayInfo();
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault(); // prevents form from submitting
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

removeButton.addEventListener("click", () => {
    carousel.remove(carousel.index);
    if (carousel.index === carousel.items.length) {
        carousel.index -= 1;
    }
    if (!carousel.items.length) {
        carousel.index = 0;
    }
    displayInfo();
})

toggleRead.addEventListener("click", () => {
    if (carousel.active().read) {
        carousel.active().read = false;
    } else {
        carousel.active().read = true;
    }
    displayInfo();
})