/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var CONFIG = GLOBAL.CONFIG;
var LOGGER = GLOBAL.LOGGER;

var express = require('express');
var responseManager = require('../utils/response-manager');

var LOGGER = require("../utils/logger");

var getRouter = function() 
{
	var HTTP_STATUS_CODES = CONFIG.httpStatus;
	var USER_SESSION_NAME = CONFIG.session.userSessionName;
	
	var sendResponse = responseManager.sendResponse;
	var sendError = responseManager.sendError;
	
	var router = express.Router();

    router.all('/*', function(req, res, next)
    {
    	if(req.session && req.session[USER_SESSION_NAME])
    	{
    		LOGGER.info('CHECK AUTH: OK - FOUND SESSION FOR USER: ' + req.session[USER_SESSION_NAME]);
    		next();
		}
    	else
    	{
    		var errMessage = 'CHECK AUTH: FAILED';
    		sendError(next, errMessage, HTTP_STATUS_CODES.UNAUTHORIZED);
    	}
    });

    return router;
};

module.exports = getRouter;