import { helper } from '@ember/component/helper';

export function equal(params/*, hash*/) {
	return params.reduce((a,b)=>{
		return a===b;
	});
}

export default helper(equal);
