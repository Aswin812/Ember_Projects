import Route from '@ember/routing/route';
import {service} from '@ember/service';

export default class HomepageBorrowedBooksRoute extends Route {
  @service books;
  @service currentUser;

  queryParams = {
    search: { refreshModel: true },
    sort: {refreshModel: true }
  };

  model(params){
    this.books.getBorrowedBooks();
    if (params.search) {
      this.books.searchBooks(params.search, this.books.filteredBooks);
    }
    // console.log(this.books.filteredBooks)

    if(params.sort){
      this.sortBy = params.sort;
      this.books.sortBooks(params.sort);
    }
    // let borrowedBooksId = this.currentUser.currentUser.borrowedBooks.map(b => b.book.id);
    // this.books.filteredBooks = this.books.books.filter(book => borrowedBooksId.includes(book.id));
    return this.books;
  }
}
