import Route from '@ember/routing/route';
import { service } from '@ember/service';

// function wait() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), 500);
//   })
// }

export default class HomepageRoute extends Route {
  @service books;
  @service router;
  @service currentUser;

  beforeModel(transition){
    if (this.currentUser.isEmpty()) {
      this.currentUser.previousRoute.push(transition);
      this.router.transitionTo('login');
      return;
    }

    if(this.currentUser.currentUser.isAdmin){
      this.router.transitionTo('admin-page.manage-books')
    }

  }

  async model(params) {
    // await wait();
    if (this.books.books.length === 0) {
      this.books.getBooks();
    }
    if(params.sort){
      return params.sort;
    }
  }
}
