'use strict';

var ppp = angular.module('ppppropertiesApp');

ppp.directive('ngSparkline', function() {
	var url = "http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=7&callback=JSON_CALLBACK&q=";
	var loader = '<div id="fountainG"><div id="fountainG_1" class="fountainG"></div><div id="fountainG_2" class="fountainG"></div><div id="fountainG_3" class="fountainG"></div><div id="fountainG_4" class="fountainG"></div><div id="fountainG_5" class="fountainG"></div><div id="fountainG_6" class="fountainG"></div><div id="fountainG_7" class="fountainG"></div><div id="fountainG_8" class="fountainG"></div></div>';
	return {
		restrict: 'AEC',
		require: '^ngCity',
		transclude: true,
		scope: {
			ngCity: '@'
		},
		template: '<div class="sparkline"><input type="text" data-ng-model="ngCity"><button ng-click="showTemp()">Check {{ngCity}}</button><div ng-transclude></div><div ng-show="isLoading">'+ loader + '</div><div class="graph"></div></div>',
		controller: ['$scope', '$http', function($scope, $http) {


			$scope.getTemp = function(city) {
				$scope.isLoading = true;
				$http({
						method: 'JSONP',
						url: url + city
					}).success(function(data) {
						$scope.isLoading = false;
						var weather = [];
						angular.forEach(data.list, function(value){
						weather.push(value);
					});
					$scope.weather = weather;
				});
			}

			$scope.showTemp = function(){
				$("svg.sparkline").fadeOut('800').delay(800).remove();
				$scope.getTemp($scope.ngCity);
	        };

		}],
		link: function(scope, iElement, iAttrs, ctrl) {
			scope.getTemp(iAttrs.ngCity);
			scope.$watch('weather', function(newVal) {
				// the `$watch` function will fire even if the
				// weather property is undefined, so we'll
				// check for it
				if(newVal) {
					var highs = [],
						width   = iAttrs.width || 200,
    					height  = iAttrs.height || 80;

					angular.forEach(scope.weather, function(value){
						highs.push(value.temp.max);
					});

					chartGraph(iElement, highs, iAttrs);
				}
			});
		}
	}

});

ppp.directive('ngCity', function() {
	return {
		controller: function($scope) {}
	}
});

var chartGraph = function(element, data, opts) {
	var width = opts.width || 200,
		height = opts.height || 80,
		padding = opts.padding || 30;

	// chart
	var svg = d3.select(
	  	element[0])
	  	.append('svg:svg')
	  	.attr('width', width)
	  	.attr('height', height)
	  	.attr('class', 'sparkline')
	  	.append('g')
	  	.attr('transform', 'translate('+padding+', '+padding+')'
  	);

	svg.selectAll('*').remove();

	var maxY = d3.max(data),
	x = d3.scale.linear().domain([0, data.length]).range([0, width]),
	y = d3.scale.linear().domain([0, maxY]).range([height, 0]),
    yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);

	svg.append('g').attr('class', 'axis').call(yAxis);

	var line = d3.svg.line()
	.interpolate('linear').x(function(d,i){return x(i);})
	.y(function(d,i){return y(d);}),
	path = 	svg.append('svg:path')
			.data([data])
			.attr('d', line)
	        .attr('fill', 'none')
	        .attr('stroke', 'rgb(0, 0, 0)')
	        .attr('stroke-width', '3');
}
