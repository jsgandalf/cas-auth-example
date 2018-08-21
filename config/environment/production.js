'use strict';

// Production specific configuration
// =================================
module.exports = {
	protocal: 'https://',
  host: 'adminsystems.byu.edu',
  ip: process.env.IP || undefined, // Server IP
  port: process.env.PORT || 8080, // Server port
  // oracle connection options
  purchasingUser: 'user',
  purchasingPass: 'asdf123'
};


