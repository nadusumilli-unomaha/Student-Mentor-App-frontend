import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import Ember from 'ember';

export default Controller.extend({
    content: alias('model'),
	routing: Ember.inject.service('-routing'),
    confirmpassword: '',
    validationErrorMsg: "",
    showError: false,
    
    //client-side validators
    usernameChanged: Ember.observer('content.user.username', function(){
        var user = this.get('content').user;
        if (user.get('username') === undefined) {
            this.set('usernameclasses', null);
            this.set('usernameIcon', 'chevron-left');
        } else if (!/^[a-z0-9]+$/i.test(user.get('username'))){
            this.set('usernameerror', 'Username must contain only alphanumeric characters');
            this.set('usernameclasses', 'has-error');
            this.set('usernameIcon', 'remove');
        } else {
            this.set('usernameerror', null);
            this.set('usernameclasses', 'has-success');
            this.set('usernameIcon', 'ok');
        }
    }),
    emailChanged: Ember.observer('content.user.email', function(){
        var user = this.get('content').user;
      
        
        var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (user.get('email') === undefined ) {
            this.set('emailclasses', null);
            this.set('emailIcon', 'chevron-left');
        } else if (!re.test(user.get('email'))) {
            this.set('emailerror', 'Enter a valid email');
            this.set('emailclasses', 'has-error');
            this.set('emailIcon', 'remove');
        } else {
            this.set('emailclasses', 'has-success');
            this.set('emailIcon', 'ok');
        }
    }),
    passwordChanged: Ember.observer('content.user.password', function(){
        var user = this.get('content').user;
        if (user.get('password')===undefined || user.get('password')===''){
                this.set('passwordclasses', null);
                this.set('passwordIcon', 'chevron-left');
        }
        else if (user.get('password').length<8){
            this.set('passwordclasses', 'has-error');
            this.set('passwordIcon', 'remove');
        }
        else {
            this.set('passwordclasses', 'has-success');
            this.set('passwordIcon', 'ok');
        }
    }),
    passwordConfirmChanged: Ember.observer('content.user.confirmpassword', function(){
        var user = this.get('content').user;
        if (user.get('confirmpassword')===undefined || user.get('confirmpassword')===''){
                this.set('confirmpasswordclasses', null);
                this.set('confirmpasswordIcon', 'chevron-left');
        }
        else if (user.get('password') !== user.get('confirmpassword')){
            this.set('confirmpasswordclasses', 'has-error');
            this.set('confirmpasswordIcon', 'remove');
        } else {
            this.set('confirmpasswordclasses', 'has-success');
            this.set('confirmpasswordIcon', 'ok');
        }
    }),
   


 //actions
    actions: {
        register: function(){
            var route = this;
            route.set('validationErrorMsg', '');
            console.log(route.get('content'));
            var user = route.get('content').user;
              //console.log(gender);
              
              //probably want to do some additional validation here
                if(user.get('password') === route.get('confirmpassword')){
                    var requestdata = {
                      'username': user.get("username"),
                      'password': user.get('password'),
                      'email': user.get('email'),
                    };
                    if(user.get('password') !== ''){
                        Ember.$.post('../api/register/', requestdata, function(response){
                            var errMsg = '';
                            if(response.data.status ==="error"){
                                if(response.data.username){
                                  errMsg = response.data.username;
                                } 
                                else if(response.data.email){
                                  errMsg = response.data.email;
                                }
                                else {
                                  errMsg = "An unknown error occured. Please try again";
                                }
                                route.set('validationErrorMsg', errMsg);
                            }
                            else{
                                //success
                                route.set('success', true);
                                //could forward the user to another page (like home)
                                //t.transitionTo('login');
                                route.get('routing').transitionTo('login');
                            }
                        });
                    }
                    else{
                        route.set('validationErrorMsg', 'Please enter a password');
                    }
                }
                else 
                {
                    route.set('validationErrorMsg', 'Passwords don\'t match');
                }

                },
                
            }
});
