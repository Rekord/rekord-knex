
var Rekord = require('rekord');
var Class = Rekord.Class;

function Rest(database)
{
  this.database = database;
}

Class.create( Rest,
{

  // success ( data[] )
  // failure ( data[], status )
  all: function( options, success, failure )
  {
    var db = this.database;
    var builder = db.api
      .select('*')
      .from( db.name )
    ;

    if (Rekord.isFunction(options))
    {
      options( builder );
    }

    builder
      .then( function(rows) {
        success( rows );
      })
      .catch( function(error) {
        failure( [], error );
      })
    ;
  },

  // success( data )
  // failure( data, status )
  get: function( model, options, success, failure )
  {
    var db = this.database;
    var builder = db.api
      .select('*')
      .from( db.name )
      .where( this.keyOf( model ) )
    ;

    if (Rekord.isFunction(options))
    {
      options( builder );
    }

    builder
      .then( function(rows) {
        success( rows[0] );
      })
      .catch( function(error) {
        failure( null, error );
      })
    ;
  },

  // success ( data )
  // failure ( data, status )
  create: function( model, encoded, options, success, failure )
  {
    var db = this.database;
    var builder = db.api( db.name )
      .returning( db.returning )
      .insert( encoded )
    ;

    if (Rekord.isFunction(options))
    {
      options( builder );
    }

    builder
      .then( function(rows) {
        success( rows[0] );
      })
      .catch( function(error) {
        failure( null, error );
      })
    ;
  },

  // success ( data )
  // failure ( data, status )
  update: function( model, encoded, options, success, failure )
  {
    var db = this.database;
    var builder = db.api( db.name )
      .where( this.keyOf( model ) )
      .update( encoded )
    ;

    if (Rekord.isFunction(options))
    {
      options( builder );
    }

    builder
      .then( function() {
        success( {} );
      })
      .catch( function(error) {
        failure( null, error );
      })
    ;
  },

  // success ( data )
  // failure ( data, status )
  remove: function( model, options, success, failure )
  {
    var db = this.database;
    var builder = db.api( db.name )
      .where( this.keyOf( model ) )
      .delete()
    ;

    if (Rekord.isFunction(options))
    {
      options( builder );
    }

    builder
      .then( function() {
        success( {} );
      })
      .catch( function(error) {
        failure( null, error );
      })
    ;
  },

  // success ( data[] )
  // failure ( data[], status )
  query: function( url, query, options, success, failure )
  {
    var db = this.database;
    var select = options && options.select ? options.select : '*';

    var builder = db.api
      .select( select )
      .from( db.name )
    ;

    if (Rekord.isFunction(query))
    {
      query( builder );
    }
    else if (Rekord.isObject(query))
    {
      if (query.page_size)
      {
        builder.limit( query.page_size );

        if (query.page_index)
        {
          builder.offset( query.page_size * query.page_index );
        }
      }
    }

    builder
      .then( function(rows) {
        success( rows );
      })
      .catch( function(error) {
        failure( [], error );
      })
    ;
  },

  keyOf: function(model)
  {
    var keyHandler = this.database.keyHandler;
    var key = {};

    keyHandler.copyFields( key, keyHandler.key, model, keyHandler.key );

    return key;
  }

});

function RestFactory(database)
{
  return new Rest( database );
}

Rekord.setRest( RestFactory );
