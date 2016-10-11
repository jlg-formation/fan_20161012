(function() {
	'use strict';

	var app = angular.module('myApp', []);
	
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
})();
