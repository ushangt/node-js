'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    }).
    when('/addItem', {
      templateUrl: 'partials/addItem',
      controller: 'AddItemCtrl'
    }).
    when('/viewItem/:id', {
      templateUrl: 'partials/viewItem',
      controller: 'viewItemCtrl'
    }).
    when('/editItem/:id', {
      templateUrl: 'partials/editItem',
      controller: 'EditItemCtrl'
    }).
    when('/deleteItem/:id', {
      templateUrl: 'partials/deleteItem',
      controller: 'DeleteItemCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);    //Use HTML 5 History API (Push and Pop)
});
