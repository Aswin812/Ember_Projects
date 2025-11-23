import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageRoute extends Route {
    @service currentUser;
    @service router;
    @service books;
    model() {
        if (this.currentUser.currentUser.name === undefined) {
            this.router.transitionTo('login');
            return;
        }
        if (this.books.books.length === 0) {
            this.books.getBooks();
        }
        return { options: ["Manage Students", "Manage Books", "Borrowed Books", "Returned Books", "Due Date"] };
    }
    afterModel() {
        this.router.transitionTo('admin-page.manage-books');
    }
}
