import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AdminPageManageUsersRoute extends Route {
  @service students;
  @service currentUser;

  model() {
    return this.students.students.filter(s => s.id !== this.currentUser.currentUser.id);
  }
}
