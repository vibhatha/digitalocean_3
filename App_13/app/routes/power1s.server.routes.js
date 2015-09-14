// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
console.log('This is Power1 route');
var users = require('../../app/controllers/users.server.controller'),
	power1s = require('../../app/controllers/power1s.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'power1s' base routes 
	app.route('/api/power1s')
	   .get(power1s.list)
	   .post(users.requiresLogin, power1s.create);
    
   	// Set up the 'power1s' parameterized routes
	app.route('/api/power1s/:power1Id')
	   .get(power1s.read)
	   .put(users.requiresLogin, power1s.hasAuthorization, power1s.update)
	   .delete(users.requiresLogin, power1s.hasAuthorization, power1s.delete);
    app.route('/api/power1s/:devices')
	   .get(power1s.read)
	   .put(users.requiresLogin, power1s.hasAuthorization, power1s.update)
	   .delete(users.requiresLogin, power1s.hasAuthorization, power1s.delete);

	// Set up the 'power1Id' parameter middleware   
	app.param('power1Id', power1s.power1ByID);
    app.param('devices', power1s.power1ByDevice);
};