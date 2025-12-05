import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class AdminPageDueDateRoute extends Route {
  @service borrowedBooks;

    model() {
        return this.borrowedBooks.borrowedBooks.filter(b => new Date(b.borrowDate) > new Date(b.returnDate));
    }
}
