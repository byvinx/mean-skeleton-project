/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var CONFIG = GLOBAL.CONFIG;

var express = require('express');
var responseManager = require('../utils/response-manager');
var dataRestaurants = require('../data/data-restaurants');

var BASEROOT = '/';

var getRouter = function() 
{
	var HTTP_STATUS_CODES = CONFIG.httpStatus;
	
	var sendResponse = responseManager.sendResponse;
	var sendError = responseManager.sendError;
	
	var router = express.Router();
	
	router.get(BASEROOT, function(req, res, next) 
	{
		var successMessage = 'GET DOCUMENT LIST: SUCCESS';
		var errMessage = 'GET DOCUMENT LIST FAILED';
		
		dataRestaurants.getRestaurants().then(
		function(dataset)
		{
			if(dataset)
			{
				sendResponse(res, next, successMessage, HTTP_STATUS_CODES.GET_OK, dataset);
			}
			else
			{
				sendResponse(res, next, successMessage, HTTP_STATUS_CODES.GET_KO, dataset);
			}
		},
		function(err)
		{	
			sendError(next, errMessage, HTTP_STATUS_CODES.ERROR, err);
		});
	});
	
	router.get(BASEROOT + ':id', function(req, res, next) 
	{
		req.checkParams("id", "Enter a valid ObjectId").isMongoId();
		
		var validationErrors = req.validationErrors();
		
		if(!validationErrors)
		{
			var id = req.params.id;
			
			var successMessage = "GET DOCUMENT CON _id: " + id + ' SUCCESS';
			var errMessage = "GET DOCUMENT CON _id: " + id + ' FAILED';
	
			dataRestaurants.getRestaurantByObjectId(id).then(
			function(dataset)
			{
				if(dataset)
				{
					sendResponse(res, next, successMessage, HTTP_STATUS_CODES.GET_OK, dataset);
				}
				else
				{
					sendResponse(res, next, successMessage, HTTP_STATUS_CODES.GET_KO, dataset);
				}
			},
			function(err)
			{	
				sendError(next, errMessage,  HTTP_STATUS_CODES.ERROR, err);
			});
		}
		else
		{
			sendError(next, validationErrors, HTTP_STATUS_CODES.BAD_REQUEST);
		}
	});
	
	router.post(BASEROOT, function(req, res, next) 
	{
		req.checkBody("borough", "Enter a valid borough").isByteLength(2,10);//only one, add others
		
		var validationErrors = req.validationErrors();
		
		if(!validationErrors)
		{
			var restaurant = req.body;
			
			var errMessage = 'INSERT DOCUMENT FAILED';
		
			dataRestaurants.insertRestaurant(restaurant).then(
			function(dataset)
			{
				var success = dataset.result.ok;
				var insertedCount = dataset.insertedCount;
				
				if(success == 1 && insertedCount == 1)
				{
					var insertedId = dataset.insertedIds[0];
	
					var successMessage = "INSERT DOCUMENT OBTAIN _id: " + insertedId + ' SUCCESS';
					var document = dataset.ops[0];
					
					sendResponse(res, next, successMessage, HTTP_STATUS_CODES.POST_OK, document);
				}
				else
				{
					sendError(next, errMessage, HTTP_STATUS_CODES.ERROR);
				}
			},
			function(err)
			{	
				sendError(next, errMessage, HTTP_STATUS_CODES.ERROR, err);
			});
		}
		else
		{
			sendError(next, validationErrors, HTTP_STATUS_CODES.BAD_REQUEST);
		}
	});
	
	router.put(BASEROOT + ':id', function(req, res, next) 
	{
		req.checkParams("id", "Enter a valid ObjectId").isMongoId();
		req.checkBody("borough", "Enter a valid borough").isByteLength(2,10);//only one, add others
		
		var validationErrors = req.validationErrors();
		
		if(!validationErrors)
		{
			var id = req.params.id;
			var restaurant = req.body;
			
			var successMessage = "UPDATE DOCUMENT CON _id: " + id + ' SUCCESS';
			var errMessage = "UPDATE DOCUMENT CON _id: " + id + ' FAILED';
	
			dataRestaurants.updateRestaurant(id, restaurant).then(
			function(dataset)
			{	
				var success = dataset.result.ok;
				var nModified = dataset.result.nModified;
				
				if(success == 1 && nModified == 1)
				{
					sendResponse(res, next, successMessage, HTTP_STATUS_CODES.PUT_OK, dataset);
				}
				else
				{
					sendError(next, errMessage, HTTP_STATUS_CODES.PUT_KO);
				}
			},
			function(err)
			{	
				sendError(next, errMessage, HTTP_STATUS_CODES.ERROR, err);
			});
		}
		else
		{
			sendError(next, validationErrors, HTTP_STATUS_CODES.BAD_REQUEST);
		}
	});
	
	router.delete(BASEROOT + ':id', function(req, res, next) 
	{
		req.checkParams("id", "Enter a valid ObjectId").isMongoId();
		
		var validationErrors = req.validationErrors();
		
		if(!validationErrors)
		{
			var id = req.params.id;
			var restaurant = req.body;
			
			var successMessage = "DELETE DOCUMENT CON _id: " + id + ' SUCCESS';
			var errMessage = "DELETE DOCUMENT CON _id: " + id + ' FAILED';
		
			dataRestaurants.deleteRestaurant(id).then(
			function(dataset)
			{	
				var success = dataset.result.ok;
				var nDeleted = dataset.result.n;
				
				if(success == 1 && nDeleted == 1)
				{
					sendResponse(res, next, successMessage, HTTP_STATUS_CODES.DELETE_OK, dataset);
				}
				else
				{
					sendError(next, errMessage, HTTP_STATUS_CODES.DELETE_KO);
				}
			},
			function(err)
			{	
				sendError(next, errMessage, HTTP_STATUS_CODES.ERROR, err);
			});
		}
		else
		{
			sendError(next, validationErrors, HTTP_STATUS_CODES.BAD_REQUEST);
		}
	});
	
	return router;
};

module.exports = getRouter;