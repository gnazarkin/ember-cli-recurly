/* jshint node: true */
'use strict';

module.exports = {
  name: 'recurly-service',
  contentFor: function(type) {
    // we use body since Recurly must be available before
    if (type === 'body') {
      return '<script type="text/javascript" src="https://js.recurly.com/v4/recurly.js"></script>';
    }
  }
};
