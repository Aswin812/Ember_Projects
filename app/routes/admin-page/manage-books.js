import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageManageBooksRoute extends Route {
    @service books;
    @service router;
    @service currentUser;
    async model() {
        if (this.currentUser.currentUser.name === undefined) {
            this.router.transitionTo('login');
            return;
        }
    }
}
