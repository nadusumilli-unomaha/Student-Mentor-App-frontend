import Controller from '@ember/controller';
import Ember from 'ember';
import config from '../config/environment';

export default Controller.extend({
	actions: {
		removeMentor: function(mentor, student){
			var t = this;
			var data = {
				'mentor': mentor,
				'student': student,
			};
			Ember.$.post(config.domainURL+'/api/removeMentor/', data, function(response){
				if(response.data.success){
					t.get('auth').set('mentorRemoved','You have removed the student from this mentor successfully');
				}
			});
		},
	},
});
