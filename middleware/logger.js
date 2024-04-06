const moment = require('moment');

// Build logger middleware
const logger = (req, res, next) => {
    console.log('\n===================================================');
    console.log('Protocol:', req.protocol);
    console.log('Host:', req.get('host'));
    console.log('Original URL:', req.originalUrl);
    console.log(moment().format("DD-MM-yyyy hh:mm:ss"));
    console.log('===================================================\n');
    next();
}

module.exports = logger;