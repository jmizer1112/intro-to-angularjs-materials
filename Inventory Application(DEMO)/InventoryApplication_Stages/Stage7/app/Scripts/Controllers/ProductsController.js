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

        $scope.productToUpdate = '';

        $scope.updateProduct = function (product) {
            $scope.productToUpdate =
            {
                id: product.id,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                unit: product.unit
            };

        };

        $scope.addNewProduct = function() {
            $scope.resetProductToUpdate();
        };

        $scope.resetProductToUpdate = function() {
            $scope.productToUpdate = productsDataService.getNewItem();
        };

        $scope.cancelEntry = function() {
            $scope.productToUpdate = '';
        };

        $scope.saveEntry = function() {
            productsDataService.updateItem($scope.productToUpdate);
            $scope.products = productsDataService.getProducts();
            $scope.updateProduct($scope.productToUpdate);
        };

        $scope.saveAndResetProductToUpdate = function() {
            $scope.saveEntry();
            $scope.resetProductToUpdate();
        };

        $scope.removeProduct = function(product) {
            productsDataService.removeItem(product);
            $scope.products = productsDataService.getProducts();
        };


    }
]);