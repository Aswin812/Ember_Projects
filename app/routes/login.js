import Route from '@ember/routing/route';
import {service} from '@ember/service';


export default class LoginRoute extends Route {
  @service currentUser;
  @service router;
  beforeModel(){
    // localStorage.clear()
    if(!this.currentUser.isEmpty()){
      this.router.transitionTo('homepage.books');
    }
  }
}
