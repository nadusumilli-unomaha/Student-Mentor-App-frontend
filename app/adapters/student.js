import GoogleAdapter from './google';

export default GoogleAdapter.extend({
	namespace: 'oauth2/v1',
	pathForType(){
		return 'userinfo';
	}
});
