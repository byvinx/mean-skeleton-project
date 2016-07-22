/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var CONFIG = GLOBAL.CONFIG;

var express = require('express');
var responseManager = require('../utils/response-manager');

var getRouter = function() 
{
	var HTTP_STATUS_CODES = CONFIG.httpStatus;
	var USER_SESSION_NAME = CONFIG.session.userSessionName;
	
	var sendResponse = responseManager.sendResponse;
	var sendError = responseManager.sendError;
	
	var router = express.Router();

    router.get('/', function(req, res, next)
    {
		if(req.session && req.session[USER_SESSION_NAME])
		{
			var successMessage = 'LOGOUT: OK FOR USER: ' + req.session[USER_SESSION_NAME];
			req.session[USER_SESSION_NAME] = '';
			
			sendResponse(res, next, successMessage, HTTP_STATUS_CODES.GET_OK);
		}
		else
		{
			var errMessage = 'ERROR: NO SESSION FOUND FOR THE CLIENT - LOGOUT: FAILED';
			sendError(next, errMessage, HTTP_STATUS_CODES.ERROR);
		}
    		
    });

    return router;
};

module.exports = getRouter;