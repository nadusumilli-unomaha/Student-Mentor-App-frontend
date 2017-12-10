import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	authorizer: 'authorizer:google',
	host: 'https://googleapis/com'
});
