import DS from 'ember-data';

const{
	Model,
	attr
} = DS;

export default Model.extend({
	user: DS.belongsTo('user'),
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
