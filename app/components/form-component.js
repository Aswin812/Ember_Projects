import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { service } from '@ember/service';

export default class FormComponent extends Component {
  @service students;
  @service router;
  @service currentUser;
  @service books;
  @tracked errorMsg = null;
  tempErrorMsg = null;

  @action
  handleSubmit(event) {
    event.preventDefault();
    let check = event.target.querySelectorAll('img.error-img:not(.hidden)');
    if (check.length > 0 || this.tempErrorMsg===null) {
      this.errorMsg = "Some fields are invalid";
      return;
    }
    let formInputs = event.target.closest('form').querySelectorAll('input');
    let values = [];
    for (let inp of formInputs) {
      if (inp.type === 'checkbox') {
        values.push(inp.checked);
      }
      else if (inp.id === 'confirmpassword') continue;
      else {
        values.push(inp.value);
      }
    }

    let temp = values.pop();
    if (temp === "Login") {
      let result = this.students.login(values);
      if (result === false) {
        if (this.currentUser.previousRoute) {
          this.currentUser.previousRoute.retry();
        }
        else {
          this.router.transitionTo('homepage.books', { queryParams: { book: null, search: null, sort: null } });
        }
      }
      else if (result === true) {
        if (this.currentUser.previousRoute) {
          this.currentUser.previousRoute.retry();
        }
        else {
          this.router.transitionTo('admin-page.manage-books');
        }
      }
      else {
        this.errorMsg = "UserName or Password are Incorrect !";
      }
    }
    else if (temp === "Create Account") {
      this.students.createAccount(values);
      this.router.transitionTo('homepage.books');
    }
    else if (temp === "Add User") {
      this.students.createAccount(values, true);
      this.router.transitionTo('admin-page.manage-users');
    }
    else if (temp === "Add Book") {
      values.push(event.target.closest('form').querySelector('textarea').value);
      this.books.addBook(values);
      this.router.transitionTo('admin-page.manage-books');
    }
    else if (temp === "Save Changes") {
      values.push(event.target.closest('form').querySelector('textarea').value);
      this.books.editBook(values);
      this.router.transitionTo('admin-page.manage-books');
    }
  }


  @action
  validateConfirmPassword(event) {
    let form = event.target.closest('form');
    let password = form.querySelector('#password').value;
    let confirmpassword = event.target.value;

    let isValid = password === confirmpassword;
    this.updateValidation(event, isValid, "Passwords do not match");
  }

  @action
  validateUserName(event) {
    let isValid = /^[A-Za-z]+$/.test(event.target.value);
    this.updateValidation(event, isValid, "UserName only allows letters");
  }

  @action
  validateEmail(type, event) {
    let message;
    let isValid = true;
    if(type === 'create' && this.students.getEmailId(event.target.value)){
      isValid = false;
      message = "This Email already exists"
    }
    else if(!/^\S+@\S+\.\S+$/.test(event.target.value)){
      isValid = false;
      message = "Enter a Valid Email"
    }
    this.updateValidation(event, isValid, message);
  }

  @action
  validatePassword(event) {
    let popup = event.target.parentElement.querySelector('#validate-popup');
    let spans = popup.querySelectorAll('span');
    let value = event.target.value;
    popup.classList.remove('hidden');

    spans[0].style.color = value.length >= 8 ? "green" : "red";
    spans[1].style.color = /[a-z]/.test(value) ? "green" : "red";
    spans[2].style.color = /[A-Z]/.test(value) ? "green" : "red";
    spans[3].style.color = /\d/.test(value) ? "green" : "red";
    spans[4].style.color = /[@$!%*?&]/.test(value) ? "green" : "red";

    let isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(event.target.value);
    this.updateValidation(event, isValid, "Enter a Valid Password");
  }

  @action
  closePopup(event){
    let popup = event.target.parentElement.querySelector('#validate-popup');
    popup.classList.add('hidden');
  }

  @action
  validateMobileNumber(event) {
    let isValid = /^[0-9]{10}$/.test(event.target.value);
    this.updateValidation(event, isValid, "Mobile number must be 10 digits");
  }

  @action
  validateIsEmpty(event) {
    let isValid = event.target.value.trim() !== "";
    this.updateValidation(event, isValid, "Input cannot be empty")
  }

  @action
  validateBookTitle(event) {
    let value = event.target.value.toLowerCase();
    let isValid = this.books.books.some(b => b.title.toLowerCase() === value);
    this.updateValidation(event, !isValid, "This book title already exists")
  }

  @action
  updateValidation(event, isValid, message) {
    let image = event.target.parentElement.querySelector('.error-img');

    if (isValid) {
      image.classList.add('hidden');
      image.title = '';
      this.tempErrorMsg = "";
    }
    else {
      image.classList.remove('hidden');
      image.title = message;
      this.tempErrorMsg = message;
    }
  }

  @action
  changePasswordType(event){
    let pass = event.target.previousElementSibling;
    let image = event.target;
    pass.type = pass.type === 'text' ? 'password' : 'text';
    image.src = pass.type === 'text' ? '/images/view.png' : '/images/hide.png';
    if(pass.type === 'text'){
      setTimeout(() => {
        pass.type = 'password';
        image.src = '/images/hide.png';
      }, 5000);
    }
  }
}
