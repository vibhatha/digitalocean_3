// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'power1s' module routes
angular.module('power1s').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/power1s', {
			templateUrl: 'power1s/views/list-power1s.client.view.html'
		}).
		when('/power1s/create', {
			templateUrl: 'power1s/views/create-power1.client.view.html'
		}).
		when('/power1s/:power1Id', {
			templateUrl: 'power1s/views/view-power1.client.view.html'
		}).
		when('/power1s/:power1Id/edit', {
			templateUrl: 'power1s/views/edit-power1.client.view.html'
		});
	}
]); 