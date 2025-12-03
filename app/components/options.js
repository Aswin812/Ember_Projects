import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'
import { tracked } from 'tracked-built-ins';

export default class OptionsComponent extends Component {
  @service books;
  @service router
  @tracked sort = 'Name';

  @action
  sortBooks(event) {
    let sortBy = event.target.value;
    // this.books.sortBooks(sortBy);
    let currentRoute = this.router.currentRouteName;
    if(currentRoute !== null){
      currentRoute = currentRoute.split('.').splice(1);
    }
    this.router.transitionTo(`homepage.${currentRoute}`, {
      queryParams: { sort: sortBy }
    })
  }

  @action
  borrowedBooks(event) {
    if(event.target.value==='All'){
      this.router.transitionTo('homepage.books');
    }
    else if(event.target.value === 'Borrowed'){
      this.router.transitionTo('homepage.borrowed-books')
    }
  }
}
