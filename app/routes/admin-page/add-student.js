import Route from '@ember/routing/route';
import { service } from '@ember/service'

export default class AdminPageAddStudentRoute extends Route {
    @service router;
    @service currentUser;
    model() {
        if (this.currentUser.currentUser.name === undefined) {
            this.router.transitionTo('login');
            return;
        }
    }
}
