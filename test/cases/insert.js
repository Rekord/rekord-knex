
var Rekord = require('rekord');
var Task = require('../root.js').Task;

var t0 = new Task({
  name: 't' + Math.random()
});

Rekord.Promise
  .then(function() {
    return t0.$save();
  })
  .then(function() {
    return Task.Database.grabModel( t0.id );
  })
  .then(function(t1) {
    console.log( t1.name );
    process.exit();
  })
  .catch(function(error) {
    console.log( error );
    process.exit();
  })
;
