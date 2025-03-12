const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.id = book.id;

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <button class="toggle-read">Toggle Read</button>
            <button class="remove-book">Remove</button>
        `;

        bookCard.querySelector(".toggle-read").addEventListener("click", () => toggleReadStatus(book.id));
        bookCard.querySelector(".remove-book").addEventListener("click", () => removeBook(book.id));

        libraryDiv.appendChild(bookCard);
    });
}

function removeBook(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleReadStatus(bookId) {
    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
        book.toggleReadStatus();
        displayBooks();
    }
}

// Form handling
document.getElementById("newBookBtn").addEventListener("click", () => {
    document.getElementById("bookDialog").showModal();
});

document.getElementById("closeDialog").addEventListener("click", () => {
    document.getElementById("bookDialog").close();
});

document.getElementById("bookForm").addEventListener("submit", event => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);
    document.getElementById("bookDialog").close();
    document.getElementById("bookForm").reset();
});

// Adding some sample books
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
