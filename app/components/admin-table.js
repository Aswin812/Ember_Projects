import Component from '@glimmer/component';
import {action} from '@ember/object';
import {service} from '@ember/service';

export default class AdminTable extends Component {
  @service students;
  @service books;

  @action
  deleteStudent(student) {
    this.students.deleteStudent(student);
  }

  @action
  getBookNameById(book_id){
    return this.books.getBookNameById(book_id);
  }

  @action
  getStudentNameById(student_id){
    return this.students.getStudentNameById(student_id);
  }
}
