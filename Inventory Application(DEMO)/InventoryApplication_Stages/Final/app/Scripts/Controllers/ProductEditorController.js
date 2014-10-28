inventoryApplication.controller('ProductEditorController', ['$scope', 'productsDataService', '$routeParams', '$location',
    function ($scope, productsDataService, $routeParams, $location) {

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

        if ($routeParams.id) {
            //Because we want to create an editing version of the product returned from the service.
            $scope.updateProduct(productsDataService.getProductById($routeParams.id));
        }
        else $scope.productToUpdate = productsDataService.getNewItem();


        $scope.addNewProduct = function () {
            $scope.resetProductToUpdate();
        };

        $scope.resetProductToUpdate = function () {
            $scope.productToUpdate = productsDataService.getNewItem();
        };

        $scope.cancelEntry = function () {
            $scope.productToUpdate = '';
            $location.path("/products");
        };

        $scope.saveEntry = function () {
            productsDataService.updateItem($scope.productToUpdate);
        };

        $scope.saveEntryAndReturn = function () {
            $scope.saveEntry();
            $location.path("/products");
        };

        $scope.saveAndResetProductToUpdate = function () {
            $scope.saveEntry();
            $scope.resetProductToUpdate();
        };

    }]);