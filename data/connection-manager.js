/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var mongodb = require('mongodb');

var CONFIG = GLOBAL.CONFIG;
var LOGGER = GLOBAL.LOGGER

var uri = CONFIG.db.mongotest;
var client = mongodb.MongoClient;

function getConnection(callback)
{
	try
	{
		var authUri = '';
		
		if(CONFIG.db.username && CONFIG.db.password)
		{
			authUri = CONFIG.db.username + ':' + CONFIG.db.password + '@';
		}
		
		var uri = 'mongodb://' + authUri + CONFIG.db.host + ':' + CONFIG.db.port + '/' + CONFIG.db.name;
		
		//Get MongoClient connection pooling
		client.connect(uri, function(error, db) 
		{
			if(error)
			{
				LOGGER.error('ERROR: Connection to DB with uri: ' + uri + ' FAILED');
				return callback(error);
			}
			
			LOGGER.info('SUCCESS: Connection to DB with uri: ' + uri + ' ESTABLISHED');
			return callback(null, db);
		});
	}
	catch(err)
	{
		callback(err.stack);
	}
}

module.exports = getConnection;
