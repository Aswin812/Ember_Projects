import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';
import { service } from '@ember/service';

export default class BooksService extends Service {
    @service currentUser;
    books = new TrackedArray([
  {
    "id": 1,
    "title": "Atomic Habits",
    "subtitle": "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    "author": "James Clear",
    "publisher": "Avery",
    "publishedYear": 2018,
    "genre": "Self-help / Personal Development",
    "language": "English",
    "pages": 320,
    "stock": 10,
    "price": 499,
    "description": "Atomic Habits offers a framework for improving yourself every day. James Clear reveals practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.",
    "image": "https://books.google.com/books/content?id=RSK-DwAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 2,
    "title": "The Power of Now",
    "subtitle": "A Guide to Spiritual Enlightenment",
    "author": "Eckhart Tolle",
    "publisher": "New World Library",
    "publishedYear": 1997,
    "genre": "Spirituality / Mindfulness",
    "language": "English",
    "pages": 236,
    "stock": 10,
    "price": 420,
    "description": "A spiritual classic that teaches the importance of living in the present moment. Eckhart Tolle guides readers to free themselves from the tyranny of their thoughts and find peace by being fully present.",
    "image": "https://books.google.com/books/content?id=QyGKtAEACAAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 3,
    "title": "The Subtle Art of Not Giving a F*ck",
    "subtitle": "A Counterintuitive Approach to Living a Good Life",
    "author": "Mark Manson",
    "publisher": "Harper",
    "publishedYear": 2016,
    "genre": "Self-help / Psychology",
    "language": "English",
    "pages": 224,
    "stock": 10,
    "price": 399,
    "description": "Mark Manson cuts through the clichés to show us that improving our lives hinges not on caring about more things, but on caring about fewer things—only what truly matters.",
    "image": "https://books.google.com/books/content?id=4vUuDQAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 4,
    "title": "Ikigai",
    "subtitle": "The Japanese Secret to a Long and Happy Life",
    "author": "Héctor García & Francesc Miralles",
    "publisher": "Penguin Books",
    "publishedYear": 2017,
    "genre": "Philosophy / Lifestyle",
    "language": "English",
    "pages": 208,
    "stock": 10,
    "price": 350,
    "description": "Ikigai introduces the Japanese concept of 'reason for being' and how discovering your ikigai can lead to a fulfilling and meaningful life.",
    "image": "https://books.google.com/books/content?id=8lNnDQAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 5,
    "title": "Think Like a Monk",
    "subtitle": "Train Your Mind for Peace and Purpose Every Day",
    "author": "Jay Shetty",
    "publisher": "Simon & Schuster",
    "publishedYear": 2020,
    "genre": "Motivational / Personal Growth",
    "language": "English",
    "pages": 352,
    "stock": 10,
    "price": 480,
    "description": "Jay Shetty draws on his experience as a monk to share practical steps and wisdom to overcome negativity, reduce stress, and discover your purpose.",
    "image": "https://books.google.com/books/content?id=ZlM6DwAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 6,
    "title": "The 7 Habits of Highly Effective People",
    "subtitle": "Powerful Lessons in Personal Change",
    "author": "Stephen R. Covey",
    "publisher": "Free Press",
    "publishedYear": 1989,
    "genre": "Business / Self-help",
    "language": "English",
    "pages": 381,
    "stock": 10,
    "price": 450,
    "description": "Stephen Covey presents a principle-centered approach for solving personal and professional problems. The book teaches how to live with integrity, fairness, and human dignity.",
    "image": "https://books.google.com/books/content?id=ktZzEAAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 7,
    "title": "You Are the Placebo",
    "subtitle": "Making Your Mind Matter",
    "author": "Dr. Joe Dispenza",
    "publisher": "Hay House",
    "publishedYear": 2014,
    "genre": "Science / Self-healing",
    "language": "English",
    "pages": 360,
    "stock": 10,
    "price": 520,
    "description": "Dr. Joe Dispenza explores the power of the mind to heal the body and create lasting change through the science of neuroplasticity and meditation.",
    "image": "https://books.google.com/books/content?id=TwXhoAEACAAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 8,
    "title": "The Four Agreements",
    "subtitle": "A Practical Guide to Personal Freedom",
    "author": "Don Miguel Ruiz",
    "publisher": "Amber-Allen Publishing",
    "publishedYear": 1997,
    "genre": "Spiritual / Self-help",
    "language": "English",
    "pages": 160,
    "stock": 10,
    "price": 340,
    "description": "Don Miguel Ruiz reveals the source of self-limiting beliefs that rob us of joy and create needless suffering. The book offers four simple agreements to live by for personal freedom.",
    "image": "https://books.google.com/books/content?id=KaXdDwAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 9,
    "title": "Man’s Search for Meaning",
    "subtitle": "The Classic Tribute to Hope from the Holocaust",
    "author": "Viktor E. Frankl",
    "publisher": "Beacon Press",
    "publishedYear": 1946,
    "genre": "Psychology / Memoir",
    "language": "English",
    "pages": 184,
    "stock": 10,
    "price": 360,
    "description": "Viktor Frankl, a Holocaust survivor, describes his experiences in Nazi camps and introduces logotherapy — the belief that the search for meaning is the primary human drive.",
    "image": "https://books.google.com/books/content?id=VwUwDwAAQBAJ&printsec=frontcover&img=1&zoom=1"
  },
  {
    "id": 10,
    "title": "The Alchemist",
    "subtitle": "A Fable About Following Your Dream",
    "author": "Paulo Coelho",
    "publisher": "HarperOne",
    "publishedYear": 1988,
    "genre": "Fiction / Inspirational",
    "language": "English",
    "pages": 208,
    "stock": 1,
    "price": 380,
    "description": "The Alchemist tells the story of Santiago, a shepherd boy who dreams of finding a worldly treasure and discovers that true fulfillment lies in following one’s personal legend.",
    "image": "https://books.google.com/books/content?id=5QKSDwAAQBAJ&printsec=frontcover&img=1&zoom=1"
  }
]);
    @tracked filteredBooks = [];
    @tracked btnValue = "Borrow";
    @tracked borrowBooksDate = [];
    bookId = 1;


    constructor() {
        super(...arguments);
        this.getBooks();
    }

    getBooks() {
      // localStorage.removeItem('books');
      // return;
      // console.log(this.books)
        let getbooks = localStorage.getItem('books');
        if (getbooks) {
          let parse = JSON.parse(getbooks);
          this.books = [];
          this.books.push(...parse.map(book => new TrackedObject(book)));
          this.filteredBooks = this.books;
        }
        this.bookId = JSON.parse(localStorage.getItem('book-id'));
        this.saveSBooks();
        // console.log(this.books)
    }

    saveSBooks() {
        localStorage.setItem('books', JSON.stringify(this.books));
        localStorage.setItem('book-id', JSON.stringify(this.bookId));
    }

    searchBooks(searchText) {
        searchText = searchText.toLowerCase();
        this.filteredBooks = this.books.filter(book => {
            return book.title.toLowerCase().includes(searchText)
        });
    }

    sortBooks(type) {
        if (type === "None") {
            this.filteredBooks = [...this.books];
        }
        else if (type === "Name") {
            this.filteredBooks = [...this.filteredBooks].sort((a, b) =>
                a.title.localeCompare(b.title)
            );
        }
    }

    showBorrowedBooks(type) {
        if (type === "All") {
            this.btnValue = "Borrow";
            this.filteredBooks = this.books;
        }
        else if (type === "Borrowed") {
            this.btnValue = "Return";
            this.filteredBooks = this.currentUser.currentUser.borrowedBooks.map(b => new TrackedObject(b.book));
            this.borrowBooksDate = this.currentUser.currentUser.borrowedBooks;
        }
    }

    addBook(values) {
        // console.log(values);
        let newBook = {
            id: this.bookId,
            title: values[0],
            subtitle: values[1],
            author: values[2],
            publisher: values[3],
            publishedYear: Number(values[4]),
            genre: values[5],
            language: values[6],
            pages: Number(values[7]),
            stock: Number(values[8]),
            description: values[9],
            image: "/images/empty_image.png"
        }

        this.books.push(new TrackedObject(newBook));
        this.bookId += 1;
        // console.log(newBook)
        this.saveSBooks();
    }

    editBook(values) {
        let book = this.books.find(b => b.id == values[0]);
        book.title = values[1];
        book.subtitle = values[2];
        book.author = values[3];
        book.publisher = values[3];
        book.publishedYear = Number(values[5]);
        book.genre = values[6];
        book.language = values[7];
        book.pages = Number(values[8]);
        book.stock = Number(values[9]);
        book.description = values[10];
        // book.image: "/images/empty_image.png"

        this.saveSBooks();

    }

    deleteBook(id) {
        // console.log(id)
        let index = this.books.findIndex(book => book.id == id);

        if (index !== -1) {
            this.books.splice(index, 1);
            alert("Book Deleted")
            this.saveSBooks();
        }
        else {
            alert("Book Not Fount !")
        }
    }

    changeBookStock(num, book) {
        let changeBook = this.books.find(b => b.title === book.title);
        if (changeBook) {
            // console.log(changeBook.stock);
            changeBook.stock += num;
            // console.log(changeBook.stock);
        }
        this.saveSBooks();
    }
}
