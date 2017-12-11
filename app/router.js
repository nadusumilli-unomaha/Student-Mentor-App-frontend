import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.routerRootURL
});

Router.map(function() {
  this.route('login', {path: '/'});
  this.route('register', {path: '/register'});
  this.route('index', {path: '/admin'});
  this.route('mentors', function() {
	this.route('index', {path: '/'});
    this.route('create');
  });
});

export default Router;
