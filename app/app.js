(function() {
	'use strict';

	var app = angular.module('myApp', ['ngRoute', 'angularSpinner']);
	
	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider
			.html5Mode(true);


		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/routes/index.html'
			})
			.when('/products', {
				templateUrl: 'tmpl/routes/products.html'
			})
			.when('/services', {
				templateUrl: 'tmpl/routes/services.html'
			})
			.when('/contact', {
				templateUrl: 'tmpl/routes/contact.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
	
	
	app.run(['$injector', function($injector) {
		
		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');
		var $q = $injector.get('$q');
		var $timeout = $injector.get('$timeout');
		
		
		$rootScope.countries = [
			'France',
			'Allemagne',
			'France',
			'Italie',
			'Belgique'
		];
		
		$rootScope.showSpinner = false;
		
		$rootScope.logs = [];
		
		var isSpinStarted = false;
		
		var startSpin = function() {
			isSpinStarted = true;
			
			setTimeout(function(){
				if (isSpinStarted) {
					$rootScope.showSpinner = true;
				}
			}, 500);
		
		};
		
		var stopSpin = function() {
			isSpinStarted = false;
			$rootScope.showSpinner = false;			
		};

		
		$rootScope.startWs = function() {
			console.log('startWs', arguments);
			startSpin();
			$rootScope.logs.push('calling s1');
			$http.get('/ws/s1')
				.then(function(response) {
					console.log('response', response);
					$rootScope.logs.push('s1 response : ' + response.data.result);
					$rootScope.logs.push('calling s2, s3 and s4');
					return $q.all([$http.get('/ws/s2'), $http.get('/ws/s3'), $http.get('/ws/s4')]);
				})
				.then(function(responses) {
					console.log('then all', responses);
					$rootScope.logs.push('s2, s3, s4 responses : ' +
						responses.map(function(response) { return response.data.result; }).join(' '));
					$rootScope.logs.push('calling s5');
					return $http.get('/ws/s5');
				})
				.then(function(response) {
					$rootScope.logs.push('s5 response : ' + response.data.result);
					return $q.reject('whatever...error');
				})
				.then(function() {
					$rootScope.logs.push('wait for 2s');
					return $timeout(2000);
				})
				.then(function() {
					$rootScope.logs.push('finished.');
				})
				.finally(function() {
					stopSpin();
				})
				.catch(function(error) {
					$rootScope.logs.push('error.');
					console.error('error', error);
				});
			
		};
		
		$rootScope.cleanContent = function() {
			$rootScope.logs = [];
		};
	}]);

	app.directive('ndHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/my_header.html',
			transclude: true
		};
	});
	
	app.directive('ndBody', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/my_body.html',
			transclude: true
		};
	});
	
	app.directive('ndFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/my_footer.html',
			transclude: true
		};
	});
	
	app.directive('orsStar', ['$compile', function($compile) {
		return {
			restrict: 'E',
			scope: {
				n: '=note'
			},
			link: function(scope, element, attr) {
				console.log('link', arguments);
				
				scope.update = function(note) {
					console.log('update', arguments);
					scope.n = note;
				};
				scope.$watch('n', function() {
					var html = '';
					var note = Number(scope.n);
					note = (isNaN(note)) ? 3 : note;
					note = (note > 5) ? 5 : note;
					note = (note < 0) ? 0 : note;
					for (var i = 0; i < note; i++) {
						if ('readonly' in attr) {
							html += '<img src="img/yellow_star.png" />';
						} else {
							html += '<img ng-click="update(' + (i + 1) + ')" src="img/yellow_star.png" />';
						}
						
					}
					for (var i = note; i < 5; i++) {
						if ('readonly' in attr) {
							html += '<img src="img/white_star.png" />';
						} else {
							html += '<img ng-click="update(' + (i + 1) + ')" src="img/white_star.png" />';
						}
						
					}
					element.html(html);
					$compile(element.contents())(scope);
				});
				
				
			}
		};
	}]);
	
})();
