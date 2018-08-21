'use strict';

var path = require('path');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  sessionSecret: 'asfjip2q3r__u89fwdiojfDSJFDSJ**FF'


};


module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});

//AWS cloudwatch command
//aws cloudwatch get-metric-statistics --namespace "Worker local" --metric-name "localCount" --start-time 2016-10-23T12:00:00.000Z --end-time 2016-10-24T12:00:00.000Z --period 60 --statistics "Sum" "Maximum" "Minimum" "Average" "SampleCount"

//aws cloudwatch get-metric-statistics --namespace "Worker corporate" --metric-name "corporateCount" --start-time 2016-10-23T12:00:00.000Z --end-time 2016-10-24T12:00:00.000Z --period 60 --statistics "Sum" "Maximum" "Minimum" "Average" "SampleCount"


//NODE_ENV=production node server/leadGeneration/AWSCloudWatch/AWSCloudWatch.js local
