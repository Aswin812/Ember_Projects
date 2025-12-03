import Service from '@ember/service';
import { TrackedObject } from 'tracked-built-ins';

export default class CurrentUserService extends Service {
    currentUser = new TrackedObject();

    constructor(){
      super(...arguments);
      this.getCurrentUser();
    }

    getCurrentUser(){
      let getcurrentuser = localStorage.getItem('currentUser');
      if(getcurrentuser){
        let parse = JSON.parse(getcurrentuser);
        this.currentUser = new TrackedObject(parse);
      }
    }

    saveCurrentUser(){
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }

    setCurrentuser(user) {
        this.currentUser = user;
        this.saveCurrentUser();
    }

    isEmpty() {
        return !this.currentUser?.name;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }
}
