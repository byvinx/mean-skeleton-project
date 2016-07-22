/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */

'use strict';

var CONFIG = GLOBAL.CONFIG;
var LOGGER = GLOBAL.LOGGER;
var DBCONNECTION = GLOBAL.DBCONNECTION;

var ObjectId = require('mongodb').ObjectID; //require the ObjectId function before using it:

var COLLECTION_NAME = 'restaurants';
var CONNECTION_ERROR_MESSAGE = 'ERROR: No Connection found';

var getAllRestaurants = function(resolve, reject) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			DBCONNECTION.collection(COLLECTION_NAME).find().limit(100).toArray(function(err, dataset)
			{
				if(!err)
		        {	
		        	resolve(dataset);
		        }
		        else
		        {
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var getRestaurantById = function(resolve, reject, id) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			var findJson = {"restaurant_id" : id};
		
			DBCONNECTION.collection(COLLECTION_NAME).findOne(findJson, function(err, dataset)
			{
				if(!err)
		        {	
		        	resolve(dataset);
		        }
		        else
		        {
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var getRestaurantByObjectId = function(resolve, reject, oid) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			DBCONNECTION.collection(COLLECTION_NAME).findOne({"_id" : ObjectId(oid)}, function(err, dataset)
			{
				if(!err)
		        {
		        	resolve(dataset);
		        }
		        else
		        {
		        	LOGGER.error(err);
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var insertRestaurant = function(resolve, reject, document) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			DBCONNECTION.collection(COLLECTION_NAME).insert(document, function(err, dataset)
			{
				if(!err)
		        {	
		        	resolve(dataset);
		        }
		        else
		        {
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var updateRestaurant = function(resolve, reject, id, document) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			var updateSet = {$set: document};
			DBCONNECTION.collection(COLLECTION_NAME).update({"_id" : ObjectId(id)}, updateSet, function(err, dataset)
			{
				if(!err)
		        {	
		        	resolve(dataset);
		        }
		        else
		        {
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var deleteRestaurant = function(resolve, reject, id) 
{
	try
	{
		if(!DBCONNECTION)
		{
			reject(new Error(CONNECTION_ERROR_MESSAGE))
		}
		else
		{
			DBCONNECTION.collection(COLLECTION_NAME).remove({"_id" : ObjectId(id)}, function(err, dataset)
			{
				if(!err)
		        {	
		        	resolve(dataset);
		        }
		        else
		        {
		        	reject(err);
		        }
			});
		}
	}
	catch(err)
	{
		reject(err);
	}
}

var getAllRestaurantsPromise = function(){
	  return new Promise(function(resolve, reject){
		  getAllRestaurants(resolve, reject);
	  });
	}

var getRestaurantByIdPromise = function(id){
	  return new Promise(function(resolve, reject){
		  getRestaurantById(resolve, reject, id);
	  });
	}

var getRestaurantByObjectIdPromise = function(oid){
	  return new Promise(function(resolve, reject){
		  getRestaurantByObjectId(resolve, reject, oid);
	  });
	}

var insertRestaurantPromise = function(document){
	  return new Promise(function(resolve, reject){
		  insertRestaurant(resolve, reject, document);
	  });
	}

var updateRestaurantPromise = function(id, document){
	  return new Promise(function(resolve, reject){
		  updateRestaurant(resolve, reject, id, document);
	  });
	}

var deleteRestaurantPromise = function(id){
	  return new Promise(function(resolve, reject){
		  deleteRestaurant(resolve, reject, id);
	  });
	}

exports.getRestaurants = getAllRestaurantsPromise;
exports.getRestaurantById = getRestaurantByIdPromise;
exports.getRestaurantByObjectId = getRestaurantByObjectIdPromise;
exports.insertRestaurant = insertRestaurantPromise;
exports.updateRestaurant = updateRestaurantPromise;
exports.deleteRestaurant = deleteRestaurantPromise;
