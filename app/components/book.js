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
  @tracked borrowedByBook = null;

  @action
  showBookDetails(book) {
    this.selectedBook = book;
  }

  @action
  closeDetails(){
    this.selectedBook = null;
    this.borrowedByBook = null;
  }

  @action
  getStudentsByBorrowedBooks(book){
    let names = this.borrowedBooks.getStudentsByBorrowedBooks(book.title);
    this.borrowedByBook = this.students.getStudentsByName(names);
  }

  @action
  stopPropagation(event) {
    event.stopPropagation();
  }

  @action
  borrowBook(book) {
    this.students.borrowBook(book);
  }

  @action
  returnBook(book) {
    this.students.returnBook(book);
  }

  @action
  deleteBook(id, event) {
    event.stopPropagation();
    this.books.deleteBook(id);
  }

  @action
  getReturnDays(book) {
    let borrowBook = this.currentUser.currentUser.borrowedBooks.find(b => b.book.id === book.id);
    let today = new Date();
    let returnDate = new Date(Date.parse(borrowBook.returnDate.split('/').reverse().join('-')));

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
