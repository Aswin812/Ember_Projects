import Component from '@glimmer/component';
import { action } from '@ember/object'
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class Authentication extends Component {
  @service students;
  @service currentUser;
  @service router;
  @tracked errorMsg;

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
        if(this.currentUser.previousRoute){
          this.currentUser.previousRoute.retry();
        }
        else{
          this.router.transitionTo('homepage.books');
        }
      }
      else if (this.students.isAdmin(values)) {
        if(this.currentUser.previousRoute){
          console.log(this.currentUser.previousRoute)
          this.currentUser.previousRoute.retry();
        }
        else{
          this.router.transitionTo('admin-page.manage-books');
        }
      }
      else{
        this.errorMsg = "UserName or Password are Incorrect !";
      }
    }
    else if (temp === "Create Account") {
      this.students.createAccount(values);
      this.router.transitionTo('homepage');
    }
  }
}
