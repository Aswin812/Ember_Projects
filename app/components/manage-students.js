import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object'

export default class ManageStudentsComponent extends Component {
    @service students;

    @action
    deleteStudent(student) {
        this.students.deleteStudent(student);
    }
}