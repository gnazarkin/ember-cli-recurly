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
  },

  getPricing: function(
    plan,
    planQuantity,
    currency,
    addons,
    coupon,
    giftCard,
    country,
    postalCode,
    taxCode,
    vatNumber
    ){

    return new Ember.RSVP.Promise(function(resolve, reject) {

      let pricing = recurly.Pricing()

      pricing = pricing
        .plan(plan, planQuantity)
        .currency(currency)

      addons.forEach(function (addon) {
        pricing.addon(addon.name, { quantity: addon.quantity });
      });

      if (coupon != null) {
        pricing.coupon(coupon);
      }

      if (giftCard != null) {
        pricing.giftcard(giftCard);
      }

      pricing
        .address({
          country: country,
          postal_code: postalCode
        })
        .tax({
          tax_code: taxCode,
          vat_number: vatNumber
        })
        .catch(function(err){
          reject(err);
        })
        .done(function(price){
          resolve(price)
        })

        return pricing;
      })
  }
});
