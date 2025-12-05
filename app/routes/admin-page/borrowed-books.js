import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class AdminPageBorrowedBooksRoute extends Route {
  @service borrowedBooks;

    model() {
        return this.borrowedBooks.borrowedBooks.filter(b => b.isReturned === "Not Returned");
    }
}
