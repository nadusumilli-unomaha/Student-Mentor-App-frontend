import { helper } from '@ember/component/helper';

export function bool(params/*, hash*/) {
  return params.reduce((a,b)=>{
		let buttonClass = '';
		console.log(a+" is not equal "+b);
		if(a === b){
			buttonClass = 'disable';
		}
		return buttonClass;
	});
}

export default helper(bool);
