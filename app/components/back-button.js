import Component from '@glimmer/component';
import {action} from '@ember/object';
import {service} from '@ember/service';

export default class BackButton extends Component {
  @service currentUser;
  @service router;
  @action
  goBack(){
    window.history.back();
  }
}
