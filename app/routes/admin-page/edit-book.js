import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageEditBookRoute extends Route {
  @service books;

  model(params) {
    let book = this.books.books.find(b => b.id == params.book_id);
    return book;
  }
}
