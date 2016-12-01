
require('../index.js');

var Rekord = require('rekord');

var knex = require('knex')({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: "./mydb.sqlite"
  }
});

var Task = Rekord({
  name: 'task',
  api: knex,
  fields: ['name', 'done'],
  defaults: {
    done: false
  }
});

Rekord.load();

exports.Task = Task;
exports.knex = knex;
