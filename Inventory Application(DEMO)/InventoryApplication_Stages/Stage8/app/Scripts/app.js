'use strict';

//Register a new module

var inventoryApplication = angular.module('inventoryApplication', ['ngRoute']);


inventoryApplication.config(function ($routeProvider) {
    $routeProvider
      .when('/products', {
          templateUrl: 'templates/ProductsTemplate.html',
          controller: 'ProductsController'
      })
      .when('/editproduct/:id', {
          templateUrl: 'templates/ProductEditorTemplate.html',
          controller: 'ProductEditorController'
      })
        .when('/editproduct', {
            templateUrl: 'templates/ProductEditorTemplate.html',
            controller: 'ProductEditorController'
        })
      .otherwise({ redirectTo: '/products' });
});


