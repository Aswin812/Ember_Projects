import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class HomepageHistoryRoute extends Route {
  @service borrowedBooks;
  @service currentUser;

  model(){
    return this.borrowedBooks.getBookHistory(this.currentUser.currentUser.borrowedBooks_id);
  }
}
