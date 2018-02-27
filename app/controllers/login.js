import Ember from 'ember';

const {
	Controller,
	inject: { service }
} = Ember;

export default Controller.extend({
	auth: service('auth-manager'),
	session: service('session'),


	actions:{
		login: function(){
			this.get('auth').login();
		},
		logout: function(){
			this.get('auth').logout();
		},
		googleAuth: function(){
			let login = this;
			let session = login.get('session');
			session.authenticate('authenticator:torii', 'google-oauth2').then(() => {
				login.store.queryRecord('student', {}).then((student) => {
					console.log(student);
					session.set('currentUser', student);
				});
			});
		}
	}
});
