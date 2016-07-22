/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

var CONFIG = GLOBAL.CONFIG;

var express = require('express');

module.exports = function() 
{
    var router = express.Router();

    router.get('/', function(req, res)
    {
    	res.json({ message: 'Welcome to our api!' });
    });

    router.get('/conf', function(req, res) 
    {
        res.send(CONFIG);
    });
	
    return router;
};
