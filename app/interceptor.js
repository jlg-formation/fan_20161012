(function() {
	'use strict';

	var app = angular.module('interceptor', []);
	
	
	app.config(['$httpProvider', '$provide', function($httpProvider, $provide) {
		
		// register the interceptor as a service
		$provide.factory('myHttpInterceptor', ['$injector', function($injector) {
		
			var $rootScope = $injector.get('$rootScope');
			var $q = $injector.get('$q');
			
			$rootScope.showSpinner = false;
	
			var countSpin = 0;
						
			var startSpin = function() {
				
				countSpin++;
				setTimeout(function(){
					if (countSpin > 0) {
						$rootScope.showSpinner = true;
						$rootScope.$apply();
					}
				}, 500);			
			};
			
			var stopSpin = function() {
				setTimeout(function(){
					countSpin--;
					if (countSpin === 0) {
						$rootScope.showSpinner = false;		
						$rootScope.$apply();						
					}
				}, 50);
			};	
			
			return {
				// optional method
				request: function(config) {
					// do something on success
					console.log('running interceptor request ', config);
					console.log('arguments ', arguments);
					if (config.url.indexOf('tmpl') === -1) {
						startSpin();
					}
					return config;
				},

				// optional method
				requestError: function(rejection) {
					if (rejection.url.indexOf('tmpl') === -1) {
						stopSpin();
					}
					console.log('running interceptor requestError ', rejection);

					// do something on error
					if (canRecover(rejection)) {
						return responseOrNewPromise;
					}
					return $q.reject(rejection);
				},



				// optional method
				response: function(response) {
					console.log('response: ', response);
					if (response.config.url.indexOf('tmpl') === -1) {
						stopSpin();
					}
				
					// do something on success
					return response;
				},

				// optional method
				responseError: function(rejection) {
					if (rejection.config.url.indexOf('tmpl') === -1) {
						stopSpin();
					}
					console.log('running interceptor responseError ', rejection);

					// do something on error
					//					if (canRecover(rejection)) {
					//						return responseOrNewPromise
					//					}
					return $q.reject(rejection);
				}
			};
		}]);

		$httpProvider.interceptors.push('myHttpInterceptor');

		console.log('interceptors', $httpProvider.interceptors);
	}]);
	
})();
