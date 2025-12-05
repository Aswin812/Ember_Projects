import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class HomepageBooksRoute extends Route {
  @service books;
  @service router;

  queryParams = {
    search: { refreshModel: true },
    sort: {refreshModel: true }
  };

  model(params){
    this.books.getAllBooks();
    if (params.search !== null) {
      this.books.searchBooks(params.search, this.books.books);
    }

    if(params.sort){
      this.sortBy = params.sort;
      this.books.sortBooks(params.sort);
    }
    let currentRoute = this.router.currentRouteName;
    if(currentRoute !== null){
      currentRoute = currentRoute.split('.').splice(1);
      if(currentRoute[0] === 'borrowed-books'){
        this.books.getAllBooks();
      }
    }
    return this.books;
  }
}
