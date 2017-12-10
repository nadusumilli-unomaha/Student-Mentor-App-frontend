import Service from '@ember/service';
import Ember from 'ember';
import config from '../config/environment';

export default Service.extend({
	store: Ember.inject.service('store'),
	routing: Ember.inject.service('-routing'),

	//field vars
	username: '',
	password: '',
	remember: false,
	errorMsg: '',

	//stored data
	user: null,
	profile: null,
	isLoggedIn: false,
	routeLoggedIn: false,
	login: function(){
		console.log('Logging in:');

		//retrieve field data
		var username = this.get('username');
		var password = this.get('password');
		var remember = this.get('remember');

		var data = {
			'username': username,
			'password': password,
			'type': 'regular',
		};
		var auth = this;

		//make api request
		Ember.$.post(config.domainURL+'/api/session/', data, function(response){
			if(response.data.isauthenticated){
				//success
				auth.set('user', auth.get('store').findRecord('user', response.data.userid));
				console.log(auth.get('user'));
				auth.set('isLoggedIn', true);
				auth.set('isSuperUser', response.data.issuperuser);

				if(remember){
					//save username and pass to local storage
					localStorage.setItem('remember', true);
					localStorage.setItem('username', auth.get('username'));
					localStorage.setItem('password', auth.get('password'));
				}
				else{
					localStorage.removeItem('remember');
					localStorage.removeItem('username');
					localStorage.removeItem('password');
				}
				auth.set('password', '');
				// Change per user role! 
				// if(auth.profile.roles.admin) {
				// 	auth.get('routing').transitionTo('admin');
				// } else {
				// 	auth.get('routing').transitionTo('subject');
				// }
				
				if(response.data.issuperuser){
					auth.get('routing').transitionTo('index');
				}
				else{
					auth.get('routing').transitionTo('mentor');
				}
				
				console.log('Login POST Request to ../api/session/ was successful.');  
			} else{
				//errors
				auth.set('errorMsg', response.data.message);
				console.log('Login POST Request to ../api/session/ was unsuccessful.');
			}
		});

	},
	logout: function(){
		console.log('Logging out');
		var auth = this;
		Ember.$.ajax({url: config.domainURL+'/api/session/', type: 'DELETE'}).then(
			function(response){
				console.log('Logout DELETE Request to ../api/session/ was successful:' + response);
				auth.set('isLoggedIn', false);
				auth.set('errorMsg', '');
				auth.set('username', '');
				auth.set('user', null);
				//auth.set('profile', null);

				if(localStorage.remember) {
					auth.set('remember', localStorage.remember);
					auth.set('username', localStorage.username);
					auth.set('password', localStorage.password);
				}
				auth.get('routing').transitionTo('login');
			}
		);
	},
	/**
		called whenever the application loads to initialize any stored session/local variables
	**/
	init: function(){
		this._super();
		var auth = this;	

		//handle session and local variable loading
		this.set('remember', localStorage.remember);

		console.log("this: "+config.domainURL);

		if(auth.get('remember')){
			auth.set('username', localStorage.username);
			auth.set('password', localStorage.password);
		}

		//check to see if the user is logged into the API
		Ember.$.get(config.domainURL+'/api/session/', function(response){
			if(response.data.isauthenticated){
				//success
				console.log('The user: \''+response.data.username+'\' is currently logged in.');
				auth.set('user', auth.get('store').findRecord('user', response.data.userid));
				auth.set('isLoggedIn', true);
				auth.set('isSuperUser', response.data.issuperuser);
			} else{
				//errors
				console.log('The user is not currently logged in.');
			}
		});
	},

	routeRestriction: function(transition, transitionURL){
		var route = this;
		if(!route.get('routeLoggedIn')){
			var trans = transition.abort();
			Ember.$.get(config.domainURL+'/api/session/', function(response){
				if(response.data.isauthenticated){
					route.set('routeLoggedIn', true);
					trans.retry();
				}
				else{
					route.get('routing').transitionTo(transitionURL);
				}
			});
		}
	} 

});
