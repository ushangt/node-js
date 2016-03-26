'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });




function IndexCtrl($scope, $http) {
  $http.get('/api/items').
    success(function(data, status, headers, config) {
      $scope.items = data.items;
    });
}

function AddItemCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.addItem = function () {
    $http.post('/api/item', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}

function viewItemCtrl($scope, $http, $routeParams) {
  $http.get('/api/item/' + $routeParams.id).
    success(function(data) {
      $scope.item = data.item;
    });
}

function EditItemCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/item/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.item;
    });

  $scope.editPost = function () {
    $http.put('/api/item/' + $routeParams.id, $scope.form).
      success(function(data) {
        $location.url('/viewItem/' + $routeParams.id);
      });
  };
}

function DeleteItemCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/item/' + $routeParams.id).
    success(function(data) {
      $scope.item = data.item;
    });

  $scope.deleteItem = function () {
    $http.delete('/api/item/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}