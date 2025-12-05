import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageRoute extends Route {
  @service currentUser;
  @service router;
  @service books;

  beforeModel(transition) {

    if (this.currentUser.isEmpty()) {
      this.currentUser.previousRoute = transition;
      this.router.transitionTo('login');
      return;
    }
    if (this.currentUser.currentUser.email !== 'admin@gmail.com') {
      this.router.transitionTo('homepage.books')
    }
  }

  model() {
    this.books.getAllBooks();
    // if (this.books.books.length === 0) {
    // }
    return { options: ["Manage Students", "Manage Books", "Borrowed Books", "Returned Books", "Due Date"] };
  }
}
