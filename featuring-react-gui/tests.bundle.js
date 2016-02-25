// This 'oficial hack' provides a context with matched files for webpack to process.
// It is needed for karma to run properly.
// It is needed for webpack to produce its test target (with mocha-loader).
var context = require.context('./src', true, /.+\.spec\.js?$/);
context.keys().forEach(context);
module.exports = context;
