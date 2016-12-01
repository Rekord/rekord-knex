# <img src="https://raw.githubusercontent.com/Rekord/rekord/master/images/rekord-color.png" width="60"> rekord-knex

[![Build Status](https://travis-ci.org/Rekord/rekord-knex.svg?branch=master)](https://travis-ci.org/Rekord/rekord-knex)
[![devDependency Status](https://david-dm.org/Rekord/rekord-knex/dev-status.svg)](https://david-dm.org/Rekord/rekord-knex#info=devDependencies)
[![Dependency Status](https://david-dm.org/Rekord/rekord-knex.svg)](https://david-dm.org/Rekord/rekord-knex)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Rekord/rekord/blob/master/LICENSE)
[![Alpha](https://img.shields.io/badge/State-Alpha-orange.svg)]()

A rekord binding to [Knex.js](http://knexjs.org/).

**Structure**

The suggested structure for using this library is as follows:

- src/connections.js: creates and exports knex objects
- src/models.js: takes connection objects and defines & exports models

**Example**

```javascript
// =============================================================================
// connections.js
// =============================================================================
exports.main = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./mydb.sqlite"
  }
});

// =============================================================================
// models.js
// =============================================================================
var connections = require('./connections.js');
var Rekord = require('rekord');

var Task = Rekord({
  name: 'task',
  api: connections.main, // api must be a knex connection
  fields: ['name', 'done'],
  defaults: {
    done: false
  }
});

// Load models from connections (where load option is used)
Rekord.load();

// Export defined models
exports.Task = Task;

// =============================================================================
// example.js
// =============================================================================
var Rekord = require('rekord');
var Task = require('./models.js').Task;

var task = new Task({
  name: 'Better Examples'
});

Rekord.Promise
  .then(function() {
    return task.$save();
  })
  .then(function(saved) {
    // task saved! let the user know or return a function which returns a promise
  })
  .catch(function(error) {
    // handle an error!
    process.exit();
  })
;
```
