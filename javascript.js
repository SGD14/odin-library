let booksLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return title + " by " + author + ", " + pages + " pages, " + read ? "already read" : "not read yet";
    }
};

function rebuildBookTable() {
    let bookTable = document.querySelector("#book-table");

    bookTable.childNodes.forEach(child => bookTable.removeChild(child));

    if(booksLibrary.length > 0) {
        booksLibrary.forEach(book => {
            let tableRow = document.createElement("tr");

            let titleColumn = document.createElement("td");
            let authorColumn = document.createElement("td");
            let pagesColumn = document.createElement("td");
            let readColumn = document.createElement("td");

            titleColumn.textContent = book.title;
            authorColumn.textContent = book.author;
            pagesColumn.textContent = book.pages;
            readColumn.textContent = book.read ? "Yes" : "No";

            tableRow.appendChild(titleColumn);
            tableRow.appendChild(authorColumn);
            tableRow.appendChild(pagesColumn);
            tableRow.appendChild(readColumn);

            bookTable.appendChild(tableRow);
        });
    }
}

let book1 = new Book("Dummy Book 1", "Dummy Author", 203, true);
let book2 = new Book("Dummy Book 2", "Dummy Author", 386, false)

booksLibrary.push(book1, book2);

rebuildBookTable();

document.querySelector("#add-new-book-button").addEventListener('click', event => {
    document.querySelector('#new-book-form').style.display = "flex";
});

document.querySelector("#close-modal-button").addEventListener('click', event => {
    document.querySelector('#new-book-form').style.display = "none";
});