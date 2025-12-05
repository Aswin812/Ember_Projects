import { tracked, TrackedArray, TrackedObject } from 'tracked-built-ins';
import Service from '@ember/service';
import { service } from '@ember/service';

export default class StudentsService extends Service {
  @service currentUser;
  @service books;
  @service borrowedBooks;
  @tracked students = new TrackedArray([]);
  studentId = 1;

  constructor() {
    super(...arguments);
    this.getStudents();
  }

  getStudents() {
    // localStorage.removeItem('students');
    // localStorage.removeItem('student-id')
    // return;
    let getstudents = localStorage.getItem('students');
    if (getstudents) {
      let parse = JSON.parse(getstudents);
      this.students.push(...parse.map(student => new TrackedObject(student)));
    }
    let id = JSON.parse(localStorage.getItem('student-id'));
    if(id){
      this.studentId = id;
    }
  }

  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
    localStorage.setItem('student-id', JSON.stringify(this.studentId));
  }

  login(values) {
    for (let student of this.students) {
      if (student.email === values[0] && student.password === values[1]) {
        this.currentUser.setCurrentuser(student);
        return true;
      }
    }
    return false;
  }

  isAdmin(values) {
    if (values[0] === "admin@gmail.com" && values[1] === "  ") {
      this.currentUser.setCurrentuser({ name: "Admin", email: "admin@gmail.com", password: "admin123", mobileNumber: "1234567890" });
      return true;
    }
    return false;
  }

  createAccount(values, isAdmin) {
    let newStudent = {
      id: this.studentId,
      name: values[0],
      email: values[1],
      password: values[2],
      mobileNumber: values[3],
      borrowedBooks_id: []
    };

    this.students.push(new TrackedObject(newStudent));
    this.studentId++;
    if (!isAdmin) this.currentUser.setCurrentuser(newStudent);
    this.saveStudents();
  }

  getStudentsById(ids) {
    return this.students.filter(s => ids.includes(s.id));
  }

  getStudentNameById(id) {
    let student = this.students.find(s => s.id === id);
    return student.name;
  }

  deleteStudent(student) {
    let borrowedBooks = this.borrowedBooks.borrowedBooks.find(b => student.borrowedBooks_id.includes(b.id) && b.isReturned === 'Not Returned')
    if (borrowedBooks) {
      alert("This Student have Borrowed Books!");
      return;
    }
    this.students.splice(this.students.find(s => s.id === student.id), 1);
    alert("Student Deleted")
    this.saveStudents();
  }

  borrowBook(b_id) {
    if(this.borrowedBooks.checkAlreadyBorrowedBook(this.currentUser.currentUser.borrowedBooks_id, b_id)){
      alert("This Book already Borrowed !");
      return;
    }
    let index = this.students.findIndex(s => s.id === this.currentUser.currentUser.id);
    let today = new Date();
    let returndate = new Date();
    returndate.setDate(today.getDate() + 7);
    today = today.toLocaleDateString('en-GB');
    returndate = returndate.toLocaleDateString('en-GB');

    let borrowed_book_id = this.borrowedBooks.addBorrowBook(this.currentUser.currentUser.id, b_id, today, returndate, "Not Returned");
    this.students[index].borrowedBooks_id.push(borrowed_book_id);
    this.books.changeBookStock(-1, b_id);
    this.books.updateBorrowedBooksId(borrowed_book_id);
    this.saveStudents();
    this.currentUser.setCurrentuser(this.students[index])
    alert("Book Borrowed");
  }

  returnBook(id, book_id) {
    alert("Book Returned");
    this.books.changeBookStock(1, book_id);
    this.borrowedBooks.markAsReturned(id);
    this.saveStudents();
    // this.currentUser.setCurrentuser(this.students[index])
    this.books.getBorrowedBooks();
  }
}
