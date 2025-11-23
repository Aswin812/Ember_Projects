import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking';

export default class BooksComponent extends Component {
    @service books;
    @service students;
    @tracked selectedBook = null;

    @action
    showBookDetails(book) {
        this.selectedBook = book;
    }

    @action
    closeDetails() {
        this.selectedBook = null;
    }

    @action
    stopPropagation(event) {
        event.stopPropagation();
    }

    @action
    bookActions(book, event) {
        if (event.target.value === "Borrow") {
            this.students.borrowBook(book);
        }
        else if (event.target.value === "Return") {
            this.students.returnBook(book);
        }
    }

    @action
    getReturnDays(book) {
        let borrowBook = this.books.borrowBooksDate.find(b => b.book.id === book.id);
        let today = new Date();
        let returnDate = new Date(Date.parse(borrowBook.returnDate.split('/').reverse().join('-')));

        let returnDays = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

        if (returnDays > 0) {
            return returnDays + " days Left";
        }
        else if (returnDays === 0) {
            return "Return Today";
        }
        else {
            return `Overdue by ${Math.abs(returnDays)} days`
        }
    }
}