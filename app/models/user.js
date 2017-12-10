import DS from 'ember-data';

export default DS.Model.extend({
	// profile: DS.belongsTo('profile'),
	// groups: DS.hasMany('group'),
	username: DS.attr(),
	email: DS.attr(),
	// password: DS.attr(),
});
