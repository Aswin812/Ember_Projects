import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
    @service currentUser;
    @service router;
    @service books;

    @action
    logout() {
        this.currentUser.logout();
        this.router.transitionTo('login');
    }
}
