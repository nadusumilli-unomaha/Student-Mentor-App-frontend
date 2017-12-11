import Controller from '@ember/controller';
import Ember from 'ember';
import config from '../../config/environment';

export default Controller.extend({
	router: Ember.inject.service('-routing'),
	username: '',
	email: '',
	password: '',
	video: '',
	cv: '',
	experience: '',
	researchinterest: '',
	institution:'',
	fieldofstudy: '',
	webpage: '',
	bio:'',


	actions: {
		postMentor: function(){
			var data = {
				'username': this.get('username'),
				'email': this.get('email'),
				'password': this.get('password'),
				'video': this.get('video'),
				'cv': this.get('cv'),
				'experience': this.get('experience'),
				'researchinterest': this.get('researchinterest'),
				'institution': this.get('institution'),
				'fieldofstudy': this.get('fieldofstudy'),
				'webpage': this.get('webpage'),
				'bio': this.get('bio'),
			};
			Ember.$.post(config.domainURL+'/api/createMentor/', data, function(response){
				if(response.data){
					console.log(response.data);
				}
			});
			this.get('router').transitionTo('index');
		},
	},
});
