// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var mongoose = require('mongoose'),
	Power1 = mongoose.model('Power1');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new articles
exports.create = function(req, res) {
	// Create a new article object
	var power1 = new Power1(req.body);
   
    
	// Set the article's 'creator' property
	power1.creator = req.user;

	// Try saving the article
	power1.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1);
		}
	});
};

// Create a new controller method that retrieves a list of articles
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of articles
 
 console.log("Query:");
 console.log(req.query);        
	if(req.query.devices!=null){//req.query
        Power1.find().where('devices').equals(req.query.devices).sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, power1s) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1s);
		}
	});
 
    }//end if
    else{
        Power1.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, power1s) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1s);
		}
	});
 
    }
    console.log('Power1 List');
};

// Create a new controller method that returns an existing article
exports.read = function(req, res) {
   console.log('Power1 Reader...')
    res.json(req.power1);
};

// Create a new controller method that updates an existing article
exports.update = function(req, res) {
	// Get the article from the 'request' object
	var power1 = req.power1;
   
    
	// Update the article fields
	power1.pid = req.body.pid;
	power1.consumption = req.body.consumption;
    power1.apparentpower = req.body.apparentpower;
    power1.vrms = req.body.vrms;
    power1.irms = req.body.irms;
    power1.phaseshift = req.body.phaseshift;
    power1.devices=(req.body.devices);
    power1.smartplugs=(req.body.smartplugs);

	// Try saving the updated article
	power1.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1);
		}
	});
};

// Create a new controller method that delete an existing article
exports.delete = function(req, res) {
	// Get the article from the 'request' object
	var power1 = req.power1;

	// Use the model 'remove' method to delete the article
	power1.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1);
		}
	});
};

// Create a new controller middleware that retrieves a single existing article
exports.power1ByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single article 
      console.log('Power1 By Id');
	Power1.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, power1) {
		if (err) return next(err);
		if (!power1) return next(new Error('Failed to load power1 ' + id));

		// If an article is found use the 'request' object to pass it to the next middleware
		req.power1 = power1;

		// Call the next middleware
		next(); 
	});
};


exports.power1ByDevice = function(req, res, next, id) {
	// Use the model 'findById' method to find a single article 
    console.log('Power1 By Device');
	Power1.find().where('devices').equals('559e0c048dfa11781552c9c6').sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, power1s) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the article 
			res.json(power1s);
		}
	});
    
   next(); 
};



// Create a new controller middleware that is used to authorize an article operation 
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the article send the appropriate error message
	if (req.power1.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};