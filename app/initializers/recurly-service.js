import EmberError from '@ember/error';
import config from '../config/environment';

export function initialize() {
  if(!config.recurly.publicKey) {
    throw new EmberError('RecurlyService: Missing Recurly key, please set `ENV.recurly.publicKey` in config.environment.js');
  }

  if (window.recurly) {
    recurly.configure(config.recurly.publicKey);
  }
}

export default {
  name: 'recurly',
  initialize: initialize
};
