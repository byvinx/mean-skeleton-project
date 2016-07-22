/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
//Il file primer-dataset contiene i record per popolare la collection  "restaurants"
//usare il comando: mongoimport --db test --collection restaurants --drop --file primer-dataset.json

//Lunch with environment - "NODE_ENV='development' node app.js" set the variable: process.env.NODE_ENV

'use strict';

GLOBAL.CONFIG = require("./conf/configurator.js");
GLOBAL.LOGGER = require("./utils/logger");

var express = require('express')
 , bodyparser = require('body-parser')
 , fs = require('fs')
 , compress = require('compression')
 , morgan = require('morgan')
 , validator = require('express-validator')
 , routerBase = require('./routes/router-base')
 , routerLogin = require('./routes/router-login')
 , routerAuth = require('./routes/router-auth')
 , routerLogout = require('./routes/router-logout')
 , routerErr = require('./routes/router-err')
 , session = require('express-session')
 , FileStore = require('session-file-store')(session);

var app = express();

var accessLogStream = fs.createWriteStream(__dirname + CONFIG.log.logAccessFile, {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(validator());
app.use(compress());

var fileStoreOptions = CONFIG.session.fileStoreOptions;
var sessionOptions = CONFIG.session.sessionOptions;

sessionOptions.store = new FileStore(fileStoreOptions);

app.use(session(sessionOptions));

app.use(express.static(__dirname + '/public', CONFIG.staticResource));//{ maxAge: 60*60*24*1000 }

app.use('/', routerBase());

app.use('/api/v1/login', routerLogin());

//app.use('/api/v1', routerAuth());

app.use('/api/v1/logout', routerLogout());

//CHECK CONNECTION POOL
var connectionManager = require("./data/connection-manager.js");
connectionManager(function(err, connection) 
{
	if(connection) 
	{
		//share connection to all data access
		GLOBAL.DBCONNECTION = connection;
		
		//add here middleware that require connection
		var routerRestaurants = require('./routes/router-restaurants');
		app.use('/api/v1/restaurants', routerRestaurants());
		
		app.use(routerErr);

		app.listen(CONFIG.httpPort);
		 
		GLOBAL.LOGGER.info('Server running in ' + app.get('env') + ' mode - Listening on port ' + CONFIG.httpPort + '!');
	}
	else
	{
		GLOBAL.LOGGER.error("DB CONNECTION ERROR: " + JSON.stringify(err));
	}
});
