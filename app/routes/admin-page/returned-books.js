import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class AdminPageReturnedBooksRoute extends Route {
  @service borrowedBooks;

  model(){
    return this.borrowedBooks.borrowedBooks.filter(b => b.isReturned === "Returned");;
  }
}
