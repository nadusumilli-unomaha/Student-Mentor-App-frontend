import DS from 'ember-data';

const{
	Model,
	attr,
    belongsTo,
    hasMany,
} = DS;

export default Model.extend({
	user: belongsTo('user'),
    students: hasMany('student'),
	video : attr(),
    cv : attr(),
    bio : attr(),
    researchinterest : attr(),
    institution : attr(),
    job : attr(),
    fieldofstudy : attr(),
    webpage : attr(),
    experience : attr(),
    studentsmaxedout : attr(),
});
