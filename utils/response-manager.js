/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var LOGGER = GLOBAL.LOGGER;

var sendResponse = function(response, next, msg, statusCode, body)
{
	LOGGER.debug(msg);
	
	var responseObject = {result: 'OK', content: body}
	
	response.status(statusCode);

	response.json(responseObject);
	
	next();
}

var sendError = function (next, msg, status, err)
{
	var resMessage = '';
	var resError = '';
	
	if(msg)
	{
		resMessage = msg;
		LOGGER.error(JSON.stringify(msg));
	}
	if(err)
	{
		resError = err.stack;
		LOGGER.error(JSON.stringify(err.stack));
	}
	if(status)
	{
		var resStatus = status;
	}
	
	var errorObj = {message: resMessage, error: resError, status: resStatus};
	
	return next(errorObj);//only 'route' is ok data parameter for next, express consider all others error data  
};

exports.sendResponse = sendResponse;
exports.sendError = sendError;