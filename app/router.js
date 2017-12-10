import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.routerRootURL
});

Router.map(function() {
  this.route('login', {path: '/login'});
  this.route('register', {path: '/register'});
  this.route('index', {path: '/'});
  this.route('mentor', {path: '/mentors'});
});

export default Router;
