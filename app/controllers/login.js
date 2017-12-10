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
			let auth = this;
			let session = auth.get('session');
			session.authenticate('authenticator:torii', 'google-oauth2').then(() => {
				auth.store.queryRecord('student', {}).then((student) => {
					console.log(student);
					session.set('currentUser', student);
				});
			});
		}
	}
});
