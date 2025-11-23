import Component from '@glimmer/component';
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { service } from '@ember/service';

export default class SearchComponent extends Component {
    @service books;
    @service router;
    @tracked searchBoxValue = "";

    @action
    getInput(event) {
        this.searchBoxValue = event.target.value;
    }

    @action
    searchBook() {
      this.router.transitionTo('homepage', {
         queryParams : {search : this.searchBoxValue}
      })
      this.books.searchBooks(this.searchBoxValue.trim());
    }
}
