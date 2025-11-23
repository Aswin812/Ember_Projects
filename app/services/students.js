import { TrackedArray, TrackedObject } from 'tracked-built-ins';
import Service from '@ember/service';
import { inject as currentuser } from '@ember/service';
import { inject as books } from '@ember/service';
import { inject as borrowedBook } from '@ember/service';

export default class StudentsService extends Service {
    @currentuser currentUser;
    @books books;
    @borrowedBook borrowedBooks;
    students = new TrackedArray([]);
    borrowedBookId = 1;

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
        this.borrowedBookId = JSON.parse(localStorage.getItem('borrowed-book-id'));
    }

    saveStudents() {
        localStorage.setItem('students', JSON.stringify(this.students));
        localStorage.setItem('borrowed-book-id', JSON.stringify(this.borrowedBookId));
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

    createAccount(values) {
        // console.log("create")
        let newStudent = {
            name: values[0],
            email: values[1],
            password: values[2],
            mobileNumber: values[3],
            borrowedBooks: new TrackedArray([])
        };

        this.students.push(new TrackedObject(newStudent));
        this.currentUser.setCurrentuser(newStudent);

        this.saveStudents();
    }

    deleteStudent(student) {
        this.students.splice(this.students.indexOf(student), 1);
        this.saveStudents();
    }

    borrowBook(b) {
        let index = this.students.findIndex(s => s.name === this.currentUser.currentUser.name);
        // this.borrowedBooks = this.students[index].borrowedBooks;
        if(this.students[index].borrowedBooks.find(bb=> bb.book.id === b.id)){
          alert("This Book Already Bowwowed");
          return;
        }
        let today = new Date();
        let returndate = new Date();
        returndate.setDate(today.getDate() + 7);
        today = today.toLocaleDateString('en-GB');
        returndate = returndate.toLocaleDateString('en-GB');

        let borrowedBook = new TrackedObject(
            {
                id: this.borrowedBookId,
                book: b,
                borrowDate: today,
                returnDate: returndate
            }
        )
        this.students[index].borrowedBooks.push(borrowedBook);
        this.borrowedBookId += 1;
        alert("Book Borrowed");
        this.books.changeBookStock(-1, b);
        this.borrowedBooks.addBorrowBook(this.currentUser.currentUser.name, b.title, today, returndate, "Not Returned");
        this.saveStudents();
    }

    returnBook(book) {
        let index = this.students.findIndex(s => s.name === this.currentUser.currentUser.name);
        let borrowedBooks = this.students[index].borrowedBooks;
        // console.log(borrowedBooks + " " + index);
        borrowedBooks.splice(borrowedBooks.findIndex(b => b.book.id == book.id), 1);
        alert("Book Returned");
        this.books.changeBookStock(1, book);
        this.books.showBorrowedBooks("Borrowed");
        this.borrowedBooks.markAsReturned(this.currentUser.currentUser.name, book.title);
        this.saveStudents();
    }
}
