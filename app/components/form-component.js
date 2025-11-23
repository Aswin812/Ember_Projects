import Component from "@glimmer/component";
import { action } from '@ember/object'
import { service } from '@ember/service';

export default class FormComponent extends Component {
    @service students;
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
        if (temp === "Login") {
            if (this.students.login(values)) {
                this.router.transitionTo('homepage');
            }
            else if (this.students.isAdmin(values)) {
                this.router.transitionTo('admin-page');
            }
        }
        else if (temp === "Create Account") {
            this.students.createAccount(values);
            this.router.transitionTo('homepage');
        }
    }
}