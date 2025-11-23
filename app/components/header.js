import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
    @service currentUser;
    @service router;
    @service books;

    @action
    logout() {
        this.books.showBorrowedBooks("All");
        this.currentUser.logout();
        this.router.transitionTo('login');
    }
}