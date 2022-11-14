let booksLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return title + " by " + author + ", " + pages + " pages, " + read ? "already read" : "not read yet";
    }
}

function rebuildBookTable() {
    let bookTable = document.querySelector("#book-table");

    while(bookTable.childElementCount > 1)
        bookTable.removeChild(bookTable.lastChild);

    if(booksLibrary.length > 0) {
        booksLibrary.forEach((book, index) => {
            let tableRow = document.createElement("tr");

            let titleColumn = document.createElement("td");
            let authorColumn = document.createElement("td");
            let pagesColumn = document.createElement("td");
            let readColumn = document.createElement("td");
            let deleteColumn = document.createElement("td");

            titleColumn.textContent = book.title;
            authorColumn.textContent = book.author;
            pagesColumn.textContent = book.pages;
            readColumn.textContent = book.read ? "Yes" : "No";
           
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.classList.add("book-delete-button");
            deleteButton.addEventListener('click', event => {
                booksLibrary.splice(index, 1);
                rebuildBookTable();
            });

            deleteColumn.appendChild(deleteButton);

            tableRow.appendChild(titleColumn);
            tableRow.appendChild(authorColumn);
            tableRow.appendChild(pagesColumn);
            tableRow.appendChild(readColumn);
            tableRow.appendChild(deleteColumn);

            bookTable.appendChild(tableRow);
        });
    }
}

function resetAddBookForm() {
    document.querySelectorAll("#new-book-form > .form-modal > form input").forEach(element => {
        if(element.type === "radio") {
            element.checked = false;
        } else {
            element.value = "";
        }
    });
}

let book1 = new Book("Dummy Book 1", "Dummy Author", 203, true);
let book2 = new Book("Dummy Book 2", "Dummy Author", 386, false)

booksLibrary.push(book1, book2);

rebuildBookTable();

document.querySelector("#add-new-book-button").addEventListener('click', event => {
    document.querySelector('#new-book-form').style.display = "flex";
    resetAddBookForm();
});

document.querySelector("#close-modal-button").addEventListener('click', event => {
    document.querySelector('#new-book-form').style.display = "none";
    resetAddBookForm();
});

document.querySelector("#form-add-new-book-button").addEventListener('click', event => {
    event.preventDefault();

    let newBookTitle = document.querySelector("#new-book-title").value;
    let newBookAuthor = document.querySelector("#new-book-author").value;
    let newBookPages = document.querySelector("#new-book-pages").value;
    let newBookRead = document.querySelector("input[type=\"radio\"]:checked").value === "Yes" ? true : false;

    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);

    booksLibrary.push(newBook);

    document.querySelector('#new-book-form').style.display = "none";
    resetAddBookForm();
    rebuildBookTable();
})