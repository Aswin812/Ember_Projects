import Component from '@glimmer/component';
import {action} from '@ember/object';

export default class AdminTable extends Component {
  @action
  deleteStudent(student) {
    if(student.borrowedBooks.length > 0){
      alert("This Student have Borrowed Books!");
      return;
    }
    this.students.deleteStudent(student);
  }
}
