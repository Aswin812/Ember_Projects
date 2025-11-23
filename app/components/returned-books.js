import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class ReturnedBooks extends Component {
    @service borrowedBooks;

    get getReturnedBooks() {
        return this.borrowedBooks.borrowedBooks.filter(b => b.isReturned === "Returned");
    }
}
