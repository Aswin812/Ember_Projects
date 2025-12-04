import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

// function wait() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(), 500);
//   })
// }

export default class HomepageRoute extends Route {
  @service books;
  @service router;
  @service currentUser;
  @tracked sortBy = 'None';

  beforeModel(){
    if (this.currentUser.isEmpty()) {
      this.router.transitionTo('login');
      return;
    }

    if(this.currentUser.currentUser.email === 'admin@gmail.com'){
      this.router.transitionTo('admin-page')
    }

  }

  async model() {
    // await wait();
    if (this.books.books.length === 0) {
      this.books.getBooks();
    }
  }

  afterModel(){
    this.router.transitionTo('homepage.books')
  }
}
