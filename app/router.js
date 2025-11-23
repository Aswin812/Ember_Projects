import EmberRouter from '@ember/routing/router';
import config from 'library-management/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('create-account');
  this.route('login');
  this.route('homepage');
  this.route('admin-page', function () {
    this.route('manage-students', function () { });
    this.route('manage-books', function () { });
    this.route('add-student');
    this.route('add-book');
    this.route('borrowed-books');
    this.route('returned-books');
    this.route('due-date');
    this.route('edit-book', { path: '/edit-book/:book_id' });
  });
  this.route('loading');
  this.route('error');
});
