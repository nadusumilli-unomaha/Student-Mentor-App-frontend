/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    torii: {
      // a 'session' property will be injected on routes and controllers
      sessionServiceName: 'session',
      allowUnsafeRedirect: true,
      providers: {
        // 'facebook-oauth2': {
        //   apiKey:      '1128913990495754',
        //   redirectUri: '/index' // default is /torii/redirect.html
        // },
        'google-oauth2': {
          apiKey:      '520867507671-372tknbjmqca11a3t3guhqhmrsonojfj.apps.googleusercontent.com',
          redirectUri: 'http://localhost:4200/', // default is /torii/redirect.html
          scope:'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
        }
      }
    },
    modulePrefix: 'frontend',
    environment,
    rootURL: '/',
    routerRootURL: '/',
    domainURL: 'http://www.surgedisasters.com',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.rootURL = "static/ember/";
    ENV.routerRootURL = '/';
    ENV.domainURL = 'http://www.surgedisasters.com';
  }

  return ENV;
};
