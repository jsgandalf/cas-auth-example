'use strict';

// Development specific configuration
// ==================================
module.exports = {
	protocal: 'http://',
  host: 'localhost',
  ip: process.env.IP || undefined, // Server IP
  port: process.env.PORT || 9000, // Server port
  // oracle connection options
  purchasingUser: 'user',
  purchasingPass: 'asdf123'
};