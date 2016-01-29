# ember-cli-recurly

This addon is a solution for integrating Recurly.js into your Ember.js web app.

## Installation

```
ember install ember-cli-recurly
```

## Usage
* Create Recurly account: https://recurly.com/
* Define your Recurly public key in config.
```
//config/environment.js
module.exports = function(environment) {
  var ENV = {
    //...
    recurly: {
      publicKey: '<your-public-key>'
    }
  };
//...
```
Inject the service where needed.
```
recurly: Ember.inject.service()
```
#### recurly
Service injection gives access to a global object _recurly_. Can Also be used to obtain a token using the service.

#### getToken()
`getToken()` gets user location from the browser and writes its coordinates to `token` property on the service. Accepts __billingInfo__ as an argument. Returns an __Ember.RSVP.Promise__ which is either resolved with __token__ containing all data about user location or is rejected with __err__ which explains why token request failed.
It is used like this:
```
var billingInfo = {
  // required attributes
  first_name: 'John',
  last_name: 'Rambo',

  // optional attributes
  cvv: '123',
  address1: '123 Main St.',
  address2: 'Unit 1',
  city: 'Hope',
  state: 'WA',
  postal_code: '98552',
  country: 'US',
  vat_number: 'SE0000'
};

this.get('recurly').getToken(billingInfo).then(function(token) {
  // do anything with token here
});
```

#### token
`token` is an object which contains the id of the token that can be the used in a recurly transaction.
```
{
  id: '123abcdebfexample'
}
```
The object is also held in the service and can be retrieved like so:
```
let token = this.get('recurly.token')
```

For more information and using the _recurly_ object refer to Recurly.js docs: https://docs.recurly.com/js/#how-it-works

#TODO
* recurly.pricing API
* recurly.paypal API
* recurly.bankAccount API 

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
