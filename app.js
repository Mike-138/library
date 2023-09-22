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
        return this.render();
    }

    this.previous = function() {
        if (this.index === 0) {
            this.index = this.items.length - 1;
        } else {
            this.index -= 1;
        }
        return this.render();
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