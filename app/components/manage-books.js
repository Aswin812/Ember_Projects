import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'

export default class ManageBooksComponent extends Component {
    @service books;

    // @action
    // handleDeleteClick(id) {
    //     this.deleteBook(id);
    // }

    @action
    deleteBook(id, event) {
        event.stopPropagation();
        this.books.deleteBook(id);
    }

    // @action
    // stopPropagation(event) {
    // }
}