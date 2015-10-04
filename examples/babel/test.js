var boat = require('../../');

require('babel/register')({
  stage: 0
});

boat.run(['./tests/*.test.js']);
