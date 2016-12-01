
var Rekord = require('rekord');
var Task = require('../root.js').Task;

Rekord.Promise
  .then(function() {
    return Task.refresh();
  })
  .then(function() {
    console.log( Task.all() );
    process.exit();
  })
  .catch(function(error) {
    console.log( error );
    process.exit();
  })
;
