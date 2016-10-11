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
	
	app.directive('orsStar', function() {
		return {
			restrict: 'E',
			link: function(scope, element, attr) {
				console.log('link', arguments);
				var html = '';
				var note = 4;
				for (var i = 0; i < note; i++) {
					html += '<img src="img/yellow_star.png" />';
				}
				for (var i = note; i < 5; i++) {
					html += '<img src="img/white_star.png" />';
				}
				element.html(html);
				
			}
		};
	});
	
})();
