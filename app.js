function Carousel() {
    this.items = [];
    this.index = 0;

    this.render = function() {
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

let book1 = new Book("My Story", "Me", 69, true);
let book2 = new Book("Your Story", "You", 420, false);
let book3 = new Book("Their Story", "Them", 999, false);
let carousel = new Carousel();
carousel.items.push(book1);
carousel.items.push(book2);
carousel.items.push(book3);

carousel.leftButton = document.querySelector(".carousel__left");
carousel.rightButton = document.querySelector(".carousel__right");

console.log(carousel);

carousel.leftButton.addEventListener("click", () => {
    console.log(carousel.previous().render().info());
})

carousel.rightButton.addEventListener("click", () => {
    console.log(carousel.next().render().info());
})