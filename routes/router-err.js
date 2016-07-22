/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

function errorHandler(err, req, res, next)
{
	res.status(err.status);
	
	if(process.env.NODE_ENV === 'production')
	{
		res.json({result: 'KO', error:{message: err.message}});
	}
	else
	{
		res.json({result: 'KO', error:{message: err.message, detail: err.error}});
	}
}

module.exports = errorHandler;