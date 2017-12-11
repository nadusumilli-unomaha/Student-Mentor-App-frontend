import DS from 'ember-data';

const{
	Model,
	belongsTo,
	hasMany,
	attr
} = DS;

export default Model.extend({
	user: belongsTo('user'),
	mentors: hasMany('mentor'),
	mentorsclicked: attr(),
	noofmentors:attr(),
});
