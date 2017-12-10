import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({
	authManager: Ember.inject.service('auth-manager'),

	actions: {
		logout: function() {
			this.get('authManager').logout();
		},

		reload: function(){
			//this.reload();
		}
	},
});
