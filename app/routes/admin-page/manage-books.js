import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageManageBooksRoute extends Route {
  @service books;

  async model() {
    return this.books;
  }
}
