import Component from '@glimmer/component';
import {service} from '@ember/service';
import {action} from '@ember/object';

export default class NavBarComponent extends Component {
  @service router;

    @action
    getRouteName(option) {
      let currentRoute = this.router.currentRouteName.split('.')[0];
      return `${currentRoute}.${option.toLowerCase().replace(' ', '-')}`;
    }
}
