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
    let getstudents = localStorage.getItem('students');
    if (getstudents) {
      let parse = JSON.parse(getstudents);
      this.students.push(...parse.map(student => new TrackedObject(student)));
    }
    else {
      this.students.push(new TrackedObject({id: this.studentId++, name: "Admin", email: "admin@gmail.com", password: "  ", mobileNumber: "1234567890", isAdmin : true }));
    }
    let id = JSON.parse(localStorage.getItem('student-id'));
    if(id){
      this.studentId = id;
    }
    this.saveStudents();
  }

  saveStudents() {
    localStorage.setItem('students', JSON.stringify(this.students));
    localStorage.setItem('student-id', JSON.stringify(this.studentId));
  }

  login(values) {
    for (let student of this.students) {
      if (student.email === values[0] && student.password === values[1]) {
        this.currentUser.setCurrentuser(student);
        return student.isAdmin;
      }
    }
    return null;
  }

  // isAdmin(values) {
  //   if (values[0] === "admin@gmail.com" && values[1] === "  ") {
  //     this.currentUser.setCurrentuser({ name: "Admin", email: "admin@gmail.com", password: "admin123", mobileNumber: "1234567890", isAdmin : true });
  //     return true;
  //   }
  //   return false;
  // }

  createAccount(values, isAdmin) {
    let newStudent = {
      id: this.studentId,
      name: values[0],
      email: values[1],
      password: values[2],
      mobileNumber: values[3],
      borrowedBooks_id: [],
      isAdmin : values[4] ?? false
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

  getEmailId(email){
    return this.students.some(s => s.email === email);
  }

  deleteStudent(student) {
    let borrowedBooks = this.borrowedBooks.borrowedBooks.find(b => student.borrowedBooks_id.includes(b.id) && b.isReturned === 'Not Returned')
    if (borrowedBooks) {
      alert("This Student have Borrowed Books!");
      return;
    }
    this.students = this.students.filter(s => s.id !== student.id);
    this.students = [...this.students]
    alert("Student Deleted")
    this.saveStudents();
    // this.getStudents();
  }

  borrowBook(b_id) {
    if(this.borrowedBooks.checkAlreadyBorrowedBook(this.currentUser.currentUser.borrowedBooks_id, b_id)){
      alert("This Book already Borrowed !");
      return;
    }
    if(this.borrowedBooks.getBorrowedBooksByIds(this.currentUser.currentUser.borrowedBooks_id, "Not Returned").length >= 5){
      alert("You already borrowed 5 Books !");
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
    this.books.updateBorrowedBooksId(b_id, borrowed_book_id);
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
