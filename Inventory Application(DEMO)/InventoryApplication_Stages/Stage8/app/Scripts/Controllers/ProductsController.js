//'use strict';

////retrieve the module DO NOT FORGET THE DEPENDENCY COLLECTION OR AN ERROR WILL OCCOUR

//Add a controller to the module
inventoryApplication.controller('ProductsController', [
    '$scope', '$location', 'productsDataService', function ($scope, $location, productsDataService) {

        $scope.filterSettings = new filterSettings(
            {
                Description: 'Description',
                Price: 'Price',
                Quantity: 'Quantity',
                Unit: 'Unit'
            });

        $scope.compareItemToFilter = function(itemToCheck, index) {

            return $scope.filterSettings.compareItemToFilter(itemToCheck, index);
        };

        $scope.sortProperty = '';
        $scope.sortDescending = false;

        $scope.toggleSortDirection = function() {
            if ($scope.sortDescending) {
                $scope.sortDescending = false;
            } else {
                $scope.sortDescending = true;
            }
        };

        $scope.store = {
            name: 'Gettin Store',
            products: productsDataService.getProducts()
        };

        var editProductPath = '/editproduct';

        $scope.editProduct = function(productToEdit)
        {
            $location.path(editProductPath + '/' + productToEdit.id);
        }

        $scope.addNewProduct = function() {
            $location.path(editProductPath);
        };

        $scope.removeProduct = function(product) {
            productsDataService.removeItem(product);
            $scope.products = productsDataService.getProducts();
        };


    }
]);