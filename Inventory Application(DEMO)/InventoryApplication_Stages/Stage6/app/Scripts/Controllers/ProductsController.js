//'use strict';

////retrieve the module DO NOT FORGET THE DEPENDENCY COLLECTION OR AN ERROR WILL OCCOUR

//Add a controller to the module
inventoryApplication.controller('ProductsController', [
    '$scope', 'productsDataService', function ($scope, productsDataService) {

        $scope.filterSettings = new filterSettings(
                            {
                                Description: 'Description',
                                Price: 'Price',
                                Quantity: 'Quantity',
                                Unit: 'Unit'
                            });

        $scope.compareItemToFilter = function (itemToCheck, index) {

            return $scope.filterSettings.compareItemToFilter(itemToCheck, index);
        };

        $scope.toggleFilteringForColumn = function (columnName) {
            $scope.filterSettings.toggleFilteringForColumn(columnName);
        }

        $scope.columnTitles = $scope.filterSettings.columnTitles;

        $scope.sortProperty = '';
        $scope.sortDescending = false;

        $scope.toggleSortDirection = function () {
            $scope.sortDescending = !$scope.sortDescending;
        }

        $scope.store = {
            name: 'Gettin Store',
            products: productsDataService.getProducts()
        }


    }
]);