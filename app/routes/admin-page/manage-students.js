import Route from '@ember/routing/route';
import { service } from '@ember/service'

export default class AdminPageManageStudentsRoute extends Route {
    @service students;

    model(){
      return this.students.students;
    }
}
