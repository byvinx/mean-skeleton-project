/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
'use strict';

function getConfiguration()
{
	var nconf = require('nconf');
	
	var environment = 'development';
	
	if(process.env.NODE_ENV)
	{
		environment = process.env.NODE_ENV;
	}
	
	nconf.file({ file:
   	 './conf/' + environment + '.json'
    });
	
	return nconf.get(environment);
}

module.exports = getConfiguration();
