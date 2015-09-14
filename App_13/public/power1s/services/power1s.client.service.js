// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'power1s' service
angular.module('power1s').factory('Power1s', ['$resource', function($resource) {
	// Use the '$resource' service to return an power1 '$resource' object
    return $resource('api/power1s/:power1Id', {
        power1Id: '@_id',
        devices: '@devices'
       
       
    },{
        update: {
            method: 'PUT'
        }
    });
}]);



