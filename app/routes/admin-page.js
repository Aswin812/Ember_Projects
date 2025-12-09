import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageRoute extends Route {
  @service currentUser;
  @service router;
  @service books;

  beforeModel(transition) {

    if (this.currentUser.isEmpty()) {
      this.currentUser.previousRoute.push(transition);
      this.router.transitionTo('login');
      return;
    }
    if (!this.currentUser.currentUser.isAdmin) {
      this.router.transitionTo('homepage.books')
    }
  }

  model() {
    this.books.getAllBooks();
    // if (this.books.books.length === 0) {
    // }
    return { options: ["Manage Users", "Manage Books", "Borrowed Books", "Returned Books", "Due Date"] };
  }
}
