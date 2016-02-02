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

  getBankInfo: function(routingNumber) {
    let lookupData = {
      routingNumber: routingNumber.toString()
    }

    return new Ember.RSVP.Promise(function(resolve, reject) {
      recurly.bankAccount.bankInfo(lookupData, function(err, bankInfo) {
        if(err) {
          reject(err);
        } else {
          resolve(bankInfo)
        }
      });
    });
  },

  payPal: function(opts) {
    let self = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      recurly.paypal(opts, function(err, token) {
        if(err) {
          reject(err);
        } else {
          self.set('token', token);
          resolve(token);
        }
      });
    });
  }
});
