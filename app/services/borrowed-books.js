import Service from '@ember/service';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

export default class BorrowedBooksService extends Service {
    borrowedBooks = new TrackedArray([]);
    borrowedBookId = 1;

    constructor() {
        super(...arguments);
        this.getBorrowedBooks();
    }

    getBorrowedBooks() {
        let getborrowedbooks = localStorage.getItem('borrowed-books');
        if (getborrowedbooks) {
            let parse = JSON.parse(getborrowedbooks);
            this.borrowedBooks.push(...parse.map(borrowedBook => new TrackedObject(borrowedBook)));
        }
        this.borrowedBookId = JSON.parse(localStorage.getItem('borrowed-book-id'));
    }

    saveBorrowedBooks() {
        localStorage.setItem('borrowed-books', JSON.stringify(this.borrowedBooks));
        localStorage.setItem('borrowed-book-id', JSON.stringify(this.borrowedBookId));
    }

    addBorrowBook(name, title, borrowdate, returndate, isReturn) {
        let borrowBook = {
            id: this.borrowedBookId,
            studentName: name,
            bookTitle: title,
            borrowDate: borrowdate,
            returnDate: returndate,
            isReturned: isReturn
        }

        this.borrowedBooks.push(new TrackedObject(borrowBook));
        this.borrowedBookId += 1;
        // console.log(this.borrowedBooks)
        this.saveBorrowedBooks();
    }

    markAsReturned(name, title) {
        for (let b of this.borrowedBooks) {
            if (b.studentName === name && b.bookTitle === title) {
                // console.log("Return")
                let today = new Date();
                today = today.toLocaleDateString("en-GB");
                b.returnDate = today;
                b.isReturned = "Returned";
                // console.log(this.borrowedBooks)
                this.saveBorrowedBooks();
                return;
            }
        }
    }
}
