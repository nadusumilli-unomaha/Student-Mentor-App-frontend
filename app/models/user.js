import DS from 'ember-data';

export default DS.Model.extend({
	mentor: DS.belongsTo('mentor'),
	student: DS.belongsTo('student'),
	username: DS.attr(),
	email: DS.attr(),
	// password: DS.attr(),
});
