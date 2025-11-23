import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'

export default class AddFormComponent extends Component {
    @service students;
    @service books;
    @service router;

    @action
    handleSubmit(event) {
        event.preventDefault();

        let formInputs = event.target.closest('form').querySelectorAll('input');
        let values = [];
        for (let inp of formInputs) {
            values.push(inp.value);
        }

        let temp = values.pop();
        if (temp === "Add Student") {
            this.students.createAccount(values);
            this.router.transitionTo('admin-page.manage-students');
        }
        else if (temp === "Add Book") {
            values.push(event.target.closest('form').querySelector('textarea').value);
            this.books.addBook(values);
            this.router.transitionTo('admin-page.manage-books');
        }
        else if (temp === "Edit Book") {
            values.push(event.target.closest('form').querySelector('textarea').value);
            this.books.editBook(values);
            this.router.transitionTo('admin-page.manage-books');
        }
    }
}