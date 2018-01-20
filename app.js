//module
var weatherApp = angular.module('weatherApp', ['ngRoute','ngResource']);

// routes
weatherApp.config(function($routeProvider) {
  $routeProvider
  // home page route
    .when('/', {
    templateUrl: 'home.html',
    controller: 'homeController'
  })

     .when('/home/:days', {
    templateUrl: 'home.html',
    controller: 'homeController'
  })

   .when('/forecast', {
    templateUrl: 'forecast.html',
    controller: 'forecastController'
  })
  
   .when('/forecast/:days', {
    templateUrl: 'forecast.html',
    controller: 'forecastController'
  })
  
});

//services
weatherApp.service('cityService',function(){
 this.city="Kiev";

});

//controllers

weatherApp.controller('homeController',['$scope','$route','$location','$resource', '$routeParams', 'cityService',function($scope , $route,$location,$resource, $routeParams, cityService){
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || '6';
  $scope.$watch('city',function(){
  cityService.city = $scope.city;
  });
  $scope.submit = function(){
    $location.path('/');
  }

 $scope.reloadRoute = function() {
   $route.reload();
}
   var apiKey = "bd5e378503939ddaee76f12ad7a97608";
  $scope.weatherAPI = 
  $resource ( "http://api.openweathermap.org/data/2.5/forecast/daily?q="+$scope.city+"&appid="+apiKey,{
   callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
   $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city,appid: apiKey, cnt: $scope.days });
   $scope.convertToDay = function(dt){
     return new Date(dt*1000);
   };
   $scope.convertToCelsius= function(degK){
     return Math.round(degK-273.15) ;
   };
   $scope.convertTommHg = function(pressure){
     return Math.round(pressure*0.75006375541921)+' mm';
   };
   
    $scope.weatherAPI1 = 
  $resource ( "http://api.openweathermap.org/data/2.5/weather?q="+$scope.city+"&appid="+apiKey,{
   callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
   $scope.weatherResult1 = $scope.weatherAPI1.get({q: $scope.city,appid: apiKey, cnt: $scope.days });
   $scope.convertToDay = function(dt){
     return new Date(dt*1000);
   };
   $scope.convertToCelsius= function(degK){
     return Math.round(degK-273.15) ;
   };
   $scope.convertTommHg = function(pressure){
     return Math.round(pressure*0.75006375541921)+' mm';
   };
   
console.log($scope.weatherResult1);
 
}]);
 


weatherApp.controller('forecastController',['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams,cityService){
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || '1';

  var apiKey = "bd5e378503939ddaee76f12ad7a97608";
  $scope.weatherAPI = 
  $resource ( "http://api.openweathermap.org/data/2.5/forecast?q="+$scope.city+"&appid="+apiKey,{
   callback: "JSON_CALLBACK"}, {get: {method: "JSONP"}});
   $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city,appid: apiKey, cnt: $scope.days });
   $scope.convertToDay = function(dt){
     return new Date(dt*1000);
   };
   $scope.convertToCelsius= function(degK){
     return Math.round(degK-273.15) +" °C";
   };
   $scope.convertTommHg = function(pressure){
     return Math.round(pressure*0.75006375541921)+' mm';
   };
  

}]);







