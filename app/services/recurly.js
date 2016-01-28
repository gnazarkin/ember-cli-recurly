import config from '../config/environment';
import injectScript from 'ember-inject-script';
import Ember from 'ember';

export default (Ember.Service || Ember.Object).extend({
  token: null,

  getToken: function(billingInfo) {
    let self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      recurly.token(billingInfo, function(err, token) {
        if(err) {
          reject(err);
        } else {
          self.set('token', token);
          resolve(token);
        }
      });
    });
  },

  currency: config.recurly.currency || "USD",
  taxCode: config.recurly.taxCode || "",
  vatNumber: config.recurly.vatNumbe || "",
});
