import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'

export default class OptionsComponent extends Component {
    @service books;
    @service router

    @action
    sortBooks(event) {
      let sortBy = event.target.value;
      this.books.sortBooks(sortBy);
      if(sortBy === 'None'){
        sortBy = '';
      }
        this.router.transitionTo('homepage', {
          queryParams : {sort : sortBy}
        })
    }

    @action
    borrowedBooks(event) {
        this.books.showBorrowedBooks(event.target.value);
    }
}
