import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import {tracked} from '@glimmer/tracking'

export default class Book extends Component {
  @service books;
  @service currentUser;
  @service students;
  @service borrowedBooks;
  @tracked selectedBook = null;
  @tracked bookHistory = null;

  @action
  showBookDetails(book) {
    this.selectedBook = book;
  }

  @action
  closeDetails(){
    this.selectedBook = null;
    this.bookHistory = null;
  }

  @action
  getBookHistory(ids){
    this.bookHistory = this.borrowedBooks.getBookHistory(ids);
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }

  @action
  borrowBook(book_id) {
    this.students.borrowBook(book_id);
  }

  @action
  returnBook(id, book_id) {
    this.students.returnBook(id, book_id);
  }

  @action
  deleteBook(id, event) {
    event.stopPropagation();
    this.books.deleteBook(id);
  }

  @action
  getBorrowedBookHistory(id){
    return this.books.getBorrowedBookHistory(id);
  }

  @action
  getReturnDays(book) {
    let today = new Date();
    let returnDate = new Date(Date.parse(book.returnDate.split('/').reverse().join('-')));

    let returnDays = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

    if (returnDays > 0) {
      return returnDays + " days Left";
    }
    else if (returnDays === 0) {
      return "Return Today";
    }
    else {
      return `Overdue by ${Math.abs(returnDays)} days`
    }
  }
}
