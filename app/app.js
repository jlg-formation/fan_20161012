(function() {
	'use strict';

	var app = angular.module('myApp', ['ngRoute']);
	
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
	
	
	app.run(['$rootScope', function($rootScope) {
		
		$rootScope.countries = [
			'France',
			'Allemagne',
			'Italie',
			'Belgique'
		];
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
