import Controller from '@ember/controller';
// import { action } from '@ember/object';
import {service} from '@ember/service';


export default class HomepageController extends Controller {
  @service books;
  queryParams = ['search', 'sort'];
  search = '';
  sort = '';

  // get computerSearch(){
  //   this.updateURL();
  //   return this.search;
  // }


  // @action
  // updateURL(){
  //   console.log(this.search)
  //   this.books.searchBooks(this.search);
  // }
}

