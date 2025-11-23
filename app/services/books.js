import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';
import { service } from '@ember/service';

export default class BooksService extends Service {
    @service currentUser;
    books = new TrackedArray([]);
    @tracked filteredBooks = [];
    @tracked btnValue = "Borrow";
    @tracked borrowBooksDate = [];
    bookId = 1;


    constructor() {
        super(...arguments);
        this.getBooks();
    }

    getBooks() {
        let getbooks = localStorage.getItem('books');
        if (getbooks) {
            let parse = JSON.parse(getbooks);
            this.books.push(...parse.map(book => new TrackedObject(book)));
            this.filteredBooks = this.books;
        }
        this.bookId = JSON.parse(localStorage.getItem('book-id'));
        this.saveSBooks();
        // console.log(this.books)
    }

    saveSBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
        localStorage.setItem('book-id', JSON.stringify(this.bookId));
    }

    searchBooks(searchText) {
        searchText = searchText.toLowerCase();
        this.filteredBooks = this.books.filter(book => {
            return book.title.toLowerCase().includes(searchText)
        });
    }

    sortBooks(type) {
        if (type === "None") {
            this.filteredBooks = [...this.books];
        }
        else if (type === "Name") {
            this.filteredBooks = [...this.filteredBooks].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
    }

    showBorrowedBooks(type) {
        if (type === "All") {
            this.btnValue = "Borrow";
            this.filteredBooks = this.books;
        }
        else if (type === "Borrowed") {
            this.btnValue = "Return";
            this.filteredBooks = this.currentUser.currentUser.borrowedBooks.map(b => new TrackedObject(b.book));
            this.borrowBooksDate = this.currentUser.currentUser.borrowedBooks;
        }
    }

    addBook(values) {
        // console.log(values);
        let newBook = {
            id: this.bookId,
            title: values[0],
            subtitle: values[1],
            author: values[2],
            publisher: values[3],
            publishedYear: Number(values[4]),
            genre: values[5],
            language: values[6],
            pages: Number(values[7]),
            stock: Number(values[8]),
            description: values[9],
            image: "/images/empty_image.png"
        }

        this.books.push(new TrackedObject(newBook));
        this.bookId += 1;
        // console.log(newBook)
        this.saveSBooks();
    }

    editBook(values) {
        let book = this.books.find(b => b.id == values[0]);
        book.title = values[1];
        book.subtitle = values[2];
        book.author = values[3];
        book.publisher = values[3];
        book.publishedYear = Number(values[5]);
        book.genre = values[6];
        book.language = values[7];
        book.pages = Number(values[8]);
        book.stock = Number(values[9]);
        book.description = values[10];
        // book.image: "/images/empty_image.png"

        this.saveSBooks();

    }

    deleteBook(id) {
        // console.log(id)
        let index = this.books.findIndex(book => book.id == id);

        if (index !== -1) {
            this.books.splice(index, 1);
            alert("Book Deleted")
            this.saveSBooks();
        }
        else {
            alert("Book Not Fount !")
        }
    }

    changeBookStock(num, book) {
        let changeBook = this.books.find(b => b.title === book.title);
        if (changeBook) {
            // console.log(changeBook.stock);
            changeBook.stock += num;
            // console.log(changeBook.stock);
        }
        this.saveSBooks();
    }
}
