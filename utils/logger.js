/* 
 * MEAN-SKELETON-PROJECT
 * author: bYvINX
 * 
 */
var CONFIG = require("../conf/configurator.js");

var winston = require('winston');
winston.emitErrs = true;

function getLoggerInstance()
{
	console.log("INIT LOGGER WITH LOG LEVEL: " + CONFIG.log.level + ' - PATH:' + CONFIG.log.filename);
	
	var logger = new winston.Logger({
	    transports: [
	        new winston.transports.File({
	            level: CONFIG.log.level,
	            filename: CONFIG.log.filename,
	            handleExceptions: true,
	            json: false,
	            maxsize: 5242880, //5MB
	            maxFiles: 5,
	            colorize: false
	        }),
	        new winston.transports.Console({
	            level: CONFIG.log.level,
	            handleExceptions: true,
	            json: false,
	            colorize: true
	        })
	    ],
	    exitOnError: false
	});
	
	return logger;
}

//Test Logging - Priority: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
/*
console.log('SET LOG LEVEL TO: ' + logLevel); 

logger.log('silly', "127.0.0.1 - there's no place like home");
logger.log('debug', "127.0.0.1 - there's no place like home");
logger.log('verbose', "127.0.0.1 - there's no place like home");
logger.log('info', "127.0.0.1 - there's no place like home");
logger.log('warn', "127.0.0.1 - there's no place like home");
logger.log('error', "127.0.0.1 - there's no place like home");
*/
module.exports = getLoggerInstance();

//per legare winston a morgan tramite lo stream
/*module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
nel file dove viene istanziato express: //app.use(require('morgan')({ "stream": logger.stream }));
*/

