var boat = require('../../');

boat.run(['./tests/*.test.js'], {
  compiler: {
    path: 'babel/register',
    stage: 0
  }
});
