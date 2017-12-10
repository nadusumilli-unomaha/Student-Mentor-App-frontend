import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
	authManager: Ember.inject.service('auth-manager'),
	beforeModel(transition) {
		this.get('authManager').routeRestriction(transition, 'login');
	},
});
