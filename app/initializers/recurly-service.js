import config from '../config/environment';
import injectScript from 'ember-inject-script';

export function initialize(container, application) {
  if(!config.recurly.publicKey) {
    throw new Ember.Error('RecurlyService: Missing Recurly key, please set `ENV.recurly.publicKey` in config.environment.js');
  }

  if (window.recurly) {
    recurly.configure(config.recurly.publicKey);
  }
}

export default {
  name: 'recurly',
  initialize: initialize
};
