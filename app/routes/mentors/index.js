/**
 * @Author: Matthew Hale <matthale>
 * @Date:   2017-12-11T09:59:08-06:00
 * @Email:  mlhale@unomaha.edu
 * @Filename: index.js
 * @Last modified by:   matthale
 * @Last modified time: 2018-03-01T16:08:56-06:00
 * @Copyright: Copyright (C) 2018 Matthew L. Hale
 */



import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
	authManager: Ember.inject.service('auth-manager'),
	beforeModel(transition) {
		this.get('authManager').routeRestriction(transition, 'login');
	},

	model() {
		return this.store.findAll('mentor', {include: 'user'});
	}
});
