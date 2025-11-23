import Route from '@ember/routing/route';
import { service } from '@ember/service';

function wait(){
  return new Promise(resolve => {
    setTimeout(() => resolve(), 1500);
  })
}

export default class HomepageRoute extends Route {
    @service books;
    @service router;
    @service currentUser;

    async model() {
        if (this.currentUser.currentUser.name === undefined) {
          this.router.transitionTo('login');
          return;
        }
        await wait();
        if (this.books.books.length === 0) {
          this.books.getBooks();
        }
    }
}
