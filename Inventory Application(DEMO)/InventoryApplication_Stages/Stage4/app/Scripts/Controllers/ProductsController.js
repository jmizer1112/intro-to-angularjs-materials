//'use strict';

////retrieve the module DO NOT FORGET THE DEPENDENCY COLLECTION OR AN ERROR WILL OCCOUR
var inventoryApplication = angular.module('inventoryApplication', []);

//Add a controller to the module
inventoryApplication.controller('ProductsController', [
    '$scope', function ProductsController($scope) {

        $scope.sortProperty = '';

        $scope.toggleSortDirection = function () {
            if ($scope.sortDescending) {
                $scope.sortDescending = null;
            }
            else {
                $scope.sortDescending = 'true';
            }
        }
        $scope.store = {
            name: 'Gettin Store',
            products: [
                { id: '0001', description: 'Beer', price: 20, quantity: 20, unit: 'case' },
                { id: '0002', description: 'Chips', price: 2, quantity: 50, unit: 'bag' },
                { id: '0003', description: 'Snickers', price: 1.5, quantity: 75, unit: 'ea' },
                { id: '0004', description: 'Jolly Rancher', price: .25, quantity: 250, unit: 'case' },
                { id: '0005', description: 'Pepsi', price: 1.75, quantity: 200, unit: 'bottle' },
                { id: '0006', description: 'Coke', price: 1.50, quantity: 250, unit: 'bottle' }
            ]
        }
    }
]);
