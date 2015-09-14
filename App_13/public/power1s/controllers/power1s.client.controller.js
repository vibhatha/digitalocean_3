// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'Power1s' controller
angular.module('power1s').controller('Power1sController', ['$scope', '$routeParams', '$location', 'Authentication', 'Power1s','Devices','SmartPlugs',
    function($scope, $routeParams, $location, Authentication, Power1s,Devices,SmartPlugs) {
    	// Expose the Authentication service
        $scope.authentication = Authentication;
        
        
        
        var power1List ={};
        
        power1List._id='';
        power1List.creator ='';
        power1List.devices='';
        power1List.smartplugs='';
        power1List.consumption='';
        power1List.apparentpower='';
        power1List.vrms='';
        power1List.irms='';
        power1List.phaseshift='';
        power1List.pid='';
        power1List.created='';
        
        $scope.power1s= power1List;
        
        
        $scope.init = function(){
            
            
        
        };
        

        // Create a new controller method for creating new Power1s
        $scope.create = function() {
        	// Use the form fields to create a new Power1 $resource object
            
            var Power1 = new Power1s({
                pid: this.pid,
                name: this.name,
                consumption: this.consumption,
                apparentpower: this.apparentpower,
                vrms: this.vrms,
                irms: this.irms,
                phaseshift: this.phaseshift,
                devices: this.devices,
                smartplugs: this.smartplugs
            });

            // Use the Power1 '$save' method to send an appropriate POST request
            Power1.$save(function(response) {
            	// If an Power1 was created successfully, redirect the user to the Power1's page 
                $location.path('power1s/' + response._id);
                console.log("Saved Power1");
                console.log(response);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of Power1s
        $scope.find = function() {
        	// Use the Power1 'query' method to send an appropriate GET request
            var power1s=[];
            $scope.power1s = Power1s.query({}, function() {
                    
                  var count=0;
                  angular.forEach($scope.power1s, function(power1, key) {
                            
                      
                      var idevice = Devices.get({deviceId:power1.devices},function(){
                            
                           power1.devices=idevice.name;
                      });
                      var ismartplug = SmartPlugs.get({smartplugId:power1.smartplugs},function(){
                      
                           power1.smartplugs=ismartplug.name;  
                      });
                                                    
                      
                      count++;
                  });//end of loop

                power1s = $scope.power1s;
            });//end of query
            
          return   power1s;
        };
        

        // Create a new controller method for retrieving a single Power1
        $scope.findOne = function() {
        	// Use the Power1 'get' method to send an appropriate GET request
            $scope.power1 = Power1s.get({power1Id: $routeParams.power1Id});
        };
        
        

        // Create a new controller method for updating a single Power1
        $scope.update = function() {
        	// Use the device '$update' method to send an appropriate PUT request
            $scope.power1.$update(function() {
            	// If an device was updated successfully, redirect the user to the device's page 
                $location.path('power1s/' + $scope.power1._id);
            }, function(errorResponse) {
            	// Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single Power1
        $scope.delete = function(power1) {
        	// If an Power1 was sent to the method, delete it
            if (power1) {
            	// Use the Power1 '$remove' method to delete the Power1
                Power1.$remove(function() {
                	// Remove the Power1 from the Power1s list
                    for (var i in $scope.power1s) {
                        if ($scope.power1s[i] === power1) {
                            $scope.power1s.splice(i, 1);
                        }
                    }
                });
            } else {
            	// Otherwise, use the Power1 '$remove' method to delete the Power1
                $scope.power1.$remove(function() {
                    $location.path('power1s');
                });
            }
        };
        
        
        //retrieving all the Smart Plugs currently created
        
        $scope.findDevices = function() {
        	// Use the Power1 'query' method to send an appropriate GET request
            $scope.deviceList = Devices.query();
            $scope.devices1 = $scope.deviceList[1];
            
        };
        
       $scope.findDevices();
        
        $scope.findSmartPlugs = function() {
        	// Use the device 'query' method to send an appropriate GET request
            $scope.smartplugList = SmartPlugs.query();
            $scope.smartplugs1 = $scope.smartplugList[1];
            
        };
        
        
        
      
       $scope.findSmartPlugs();
        
           
        
        
        
    }
]);