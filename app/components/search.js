import Component from '@glimmer/component';
import { action } from '@ember/object'
import { tracked } from '@glimmer/tracking'
import { service } from '@ember/service';

export default class SearchComponent extends Component {
  @service books;
  @service router;
  @tracked searchBoxValue = "";

  get queryParams() {
    return this.router.currentRoute.queryParams;
  }

  @action
  getInput(event) {
    this.searchBoxValue = event.target.value;
  }

  @action
  searchBook() {
    let currentRoute = this.router.currentRouteName;
    if (currentRoute !== null) {
      currentRoute = currentRoute.split('.').splice(1);
    }
    this.searchBoxValue = (this.searchBoxValue || '').trim();
    this.router.transitionTo(`homepage.${currentRoute}`, { queryParams: { search: this.searchBoxValue } });
  }

  @action
  keyPress(event) {
    if (event.key === 'Enter') {
      this.searchBook();
    }
  }
}
