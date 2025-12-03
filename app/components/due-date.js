import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class DueDate extends Component {
    @service borrowedBooks;

    get getBorrowedBooks() {
        return this.borrowedBooks.borrowedBooks.filter(b => new Date(b.borrowDate) > new Date(b.returnDate));
    }
}
