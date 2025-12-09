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
      // localStorage.removeItem('borrowed-books');
      // localStorage.removeItem('borrowed-book-id');
      // return
        let getborrowedbooks = localStorage.getItem('borrowed-books');
        if (getborrowedbooks) {
            let parse = JSON.parse(getborrowedbooks);
            this.borrowedBooks.push(...parse.map(borrowedBook => new TrackedObject(borrowedBook)));
        }
        let id = JSON.parse(localStorage.getItem('borrowed-book-id'));
        if(id){
          this.borrowedBookId = id;
        }
    }

    saveBorrowedBooks() {
        localStorage.setItem('borrowed-books', JSON.stringify(this.borrowedBooks));
        localStorage.setItem('borrowed-book-id', JSON.stringify(this.borrowedBookId));
    }

    getBorrowedBooksByIds(ids, value){
      return this.borrowedBooks.filter(b => ids.includes(b.id) && b.isReturned === value);
    }

    checkAlreadyBorrowedBook(borrowedBooksId, book_id){
      for(let b of this.borrowedBooks){
        if(borrowedBooksId.includes(b.id) && b.book_id === book_id && b.isReturned === "Not Returned"){
          return true;
        }
      }
      return false;
    }

    addBorrowBook(s_id, b_id, borrowdate, returndate, isReturn) {
        let borrowBook = {
            id: this.borrowedBookId,
            student_id: s_id,
            book_id: b_id,
            borrowDate: borrowdate,
            returnDate: returndate,
            isReturned: isReturn
        }

        this.borrowedBooks.push(new TrackedObject(borrowBook));
        this.borrowedBookId += 1;
        this.saveBorrowedBooks();
        return this.borrowedBookId-1;
    }

    markAsReturned(id) {
      for (let b of this.borrowedBooks) {
        if (b.id === id && b.isReturned === 'Not Returned') {
                let today = new Date();
                today = today.toLocaleDateString("en-GB");
                b.returnDate = today;
                b.isReturned = "Returned";
                this.saveBorrowedBooks();
                return;
            }
        }
    }

    getBookHistory(ids){
      return this.borrowedBooks.filter(b => ids.includes(b.id));
    }
}
