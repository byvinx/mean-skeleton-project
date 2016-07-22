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

    router.post('/', function(req, res, next)
    {
    	var successMessage = 'LOGIN: SUCCESS';
    	
    	var credentials = req.body;
    	
    	req.checkBody("username", "Enter a valid username").isByteLength(5);//fake check
    	req.checkBody("password", "Enter a valid password").isByteLength(8);//fake check
    	
    	var validationErrors = req.validationErrors();
    	
    	if(!validationErrors)
		{
    		var username = credentials.username;
    		var password = credentials.password;
    		
    		if(username === 'admin' && password ==='password')
    		{
    			if(req.session)
    			{
    				var successMessage = 'LOGIN: OK - USERNAME: ' + username + ' PASSWORD: ' + password;
    				req.session[USER_SESSION_NAME] = 'Administrator';
    			
    				sendResponse(res, next, successMessage, HTTP_STATUS_CODES.POST_OK, credentials);
    			}
    			else
    			{
    				var errMessage = 'ERROR: NO SESSION FOUND FOR THE CLIENT - LOGIN: FAILED - USERNAME: ' + username + ' PASSWORD: ' + password;
        			sendError(next, errMessage, HTTP_STATUS_CODES.ERROR);
    			}
    		}
    		else
    		{
    			var errMessage = 'LOGIN: FAILED - USERNAME: ' + username + ' PASSWORD: ' + password;
    			sendError(next, errMessage, HTTP_STATUS_CODES.UNAUTHORIZED);
    		}
		}
    	else
    	{
    		sendError(next, validationErrors, HTTP_STATUS_CODES.UNAUTHORIZED);
    	}
    });

    return router;
};

module.exports = getRouter;