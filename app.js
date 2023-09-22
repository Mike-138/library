function Carousel() {
    this.items = [];
    this.index = 0;

    this.render = function() {
        return items[index];
    }

    this.next = function() {
        if (index === items.length - 1) {
            index = 0;
            return;
        }
        index += 1;
        return;
    }

    this.previous = function() {
        if (index === 0) {
            index = items.length - 1;
            return;
        }
        index -= 1;
        return;
    }
}