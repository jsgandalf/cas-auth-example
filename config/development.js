'use strict';

// Development specific configuration
// ==================================
module.exports = {
  ip: process.env.IP || undefined, // Server IP
  port: process.env.PORT || 8080, // Server port
  // oracle connection options
  purchasingUser: 'user',
  purchasingPass: 'asdf123'
};