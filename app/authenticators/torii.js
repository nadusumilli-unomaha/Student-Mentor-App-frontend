import Torii from 'ember-simple-auth/authenticators/torii';
import Ember from 'ember';
import config from '../config/environment';

const {
	$,
	RSVP,
	inject: { service }
} = Ember;

export default Torii.extend({
	torii: service('torii'),
	authenticate(provider, options){
		return this.get('torii').open(provider, options).then((authResponse) => {
			return new RSVP.Promise((resolve, reject) => {
				return $.ajax(config.domainURL+'/api/session/', {
					type: 'POST',
					data: {
						'code': authResponse.authorizationCode,
						'redirect_uri': authResponse.redirectUri,
						'type': 'googleapi',
						'client_id': config.torii.providers['google-oauth2'].apiKey
					},
					success: resolve,
					error: reject
				});
			});
		});
	}
});
