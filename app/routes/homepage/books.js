import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class HomepageBooksRoute extends Route {
  @service books;
  @service router;
  @service currentUser;

  queryParams = {
    book : {refreshModel : true},
    search: { refreshModel: true },
    sort: {refreshModel: true }
  };

  model(params){
    this.books.getAllBooks();
    if (params.search) {
      this.books.searchBooks(params.search, this.books.books);
    }
    if(params.book){
      this.books.getBorrowedBooks();
      if (params.search) {
      this.books.searchBooks(params.search, this.books.filteredBooks);
    }
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
    return {books : this.books, book : params.book, search : params.search, sort : params.sort==='None' ? null : params.sort};
  }
}
