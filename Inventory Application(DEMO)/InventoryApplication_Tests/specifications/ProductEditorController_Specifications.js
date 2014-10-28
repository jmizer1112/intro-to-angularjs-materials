'use strict';

/// <reference path="Scripts/sinon-1.9.1.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-resource.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-route.js"/>
/// <reference path="Scripts/angular-mocks.js"/>

/// <reference path="../InventoryApplication/app/Scripts/Services/ProductsDataService.js"/>
/// <reference path="../InventoryApplication/app/Scripts/Controllers/ProductsController.js"/>


(function () {
    describe('During Construction of Product Editor Controller', function () {
        var scope, $controllerFactory, productsDataServiceInstance,
            httpMock, routeParamsService, locationServiceMock;

        httpMock = {};

        routeParamsService = {};

        locationServiceMock = {};

        var mockProductsCollection =
        [
            { id: '0001', description: 'Beer', price: 20, quantity: 20, unit: 'case' },
            { id: '0002', description: 'Chips', price: 2, quantity: 50, unit: 'bag' },
            { id: '0003', description: 'Snickers', price: 1.5, quantity: 75, unit: 'ea' },
            { id: 'SOMETESTID', description: 'Some Test Object', price: 2.50, quantity: 90, unit: 'ea' }
        ];

        var mockGetProductsMethod = function () {
            return mockProductsCollection;
        };

        var mockGetProductById = function (productId) {
            var requestedProduct;
            for (var index = 0; index < mockProductsCollection.length; index++) {
                if (mockProductsCollection[index].id === productId) {
                    requestedProduct = mockProductsCollection[index];
                    break;
                }
            }

            return requestedProduct;
        };

        productsDataServiceInstance = {
            getProducts: mockGetProductsMethod,
            getProductById:mockGetProductById
        };

        beforeEach(
            function () {


                module('inventoryApplication');

                module(function ($provide) {
                    $provide.value('$http', httpMock);
                    $provide.value('productsDataService', productsDataServiceInstance);
                    $provide.value('$routeParams', routeParamsService);
                    $provide.value('$location', locationServiceMock);
                });

                inject(function ($rootScope, $controller) {
                    scope = $rootScope.$new();
                    $controllerFactory = $controller;
                });

                //var controller = $controllerFactory("ProductEditorController", {
                //    $scope: scope,
                //    productsDataService: productsDataServiceInstance
                //});
            });

        it('Should call updateProduct with Product from ProductsDataService.getProductById when $routeParams.id is not undefined',
            function () {
                var productFromGetProductById =
                {
                    id: '9999',
                    description: 'Some product description',
                    price: 200.00,
                    quantity: 1500,
                    unit: 'case'
                };
                
                routeParamsService.id = 'SOMETESTID';
                
                productsDataServiceInstance.getProductById = function(id) {
                    return productFromGetProductById;
                };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                expect(scope.productToUpdate).toEqual(productFromGetProductById);

            });
        
        it('Should call UpdateProduct with Product from ProductsDataService.getNewItem when $routeParams.id is undefined',
            function () {
                if(routeParamsService.id)
                    delete routeParamsService['id'];
                
                var newProductFromProductDataServices =
                {
                    id: '9999',
                    description: 'Some product description',
                    price: 200.00,
                    quantity: 1500,
                    unit: 'case'
                };
                
                routeParamsService.id = 'SOMETESTID';
                
                productsDataServiceInstance.getNewItem = function() {
                    return newProductFromProductDataServices;
                };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                expect(scope.productToUpdate).toEqual(newProductFromProductDataServices);

            });
    
        describe('executing resetProductToUpdate function.', function () {
            var newProductFromProductDataServices;
            beforeEach(function () {
                newProductFromProductDataServices =
                {
                    id: '9999',
                    description: 'Some product description',
                    price: 200.00,
                    quantity: 1500,
                    unit: 'case'
                };

                productsDataServiceInstance.getNewItem = function () { return newProductFromProductDataServices; };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                scope.resetProductToUpdate();
            });
            
            it('should set productToUpdate to the result of a call to the getNewItem function of the productsDataService', function () {

                expect(scope.productToUpdate).toBe(newProductFromProductDataServices);

            });
        });
        
        describe('executing cancelEntry function.', function () {

            var productToUpdateBeforeCancelEntry;

            beforeEach(function () {

                productToUpdateBeforeCancelEntry =
                {
                    id: '8888',
                    description: 'Some other product description',
                    price: 99.99,
                    quantity: 1000,
                    unit: 'bag'
                };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                locationServiceMock.path = sinon.spy();

                scope.productToUpdate = productToUpdateBeforeCancelEntry;

                scope.cancelEntry();
            });

            it('should not retain the value of the the productToUpdate', function () {

                expect(scope.productToUpdate).toNotBe(productToUpdateBeforeCancelEntry);
            });

            it('should set the value of the the productToUpdate property to blank', function () {

                expect(scope.productToUpdate).toEqual('');
            });

            it('should execute path function of the locationService with the route "/products"', function () {
                expect(locationServiceMock.path.calledWithExactly('/products')).toEqual(true);
            });
        });

        describe('executing saveEntryAndReturn', function() {


            var productToUpdateBeforeCancelEntry;

            beforeEach(function () {

                productsDataServiceInstance.updateItem = sinon.spy();

                locationServiceMock.path = sinon.spy();

                productToUpdateBeforeCancelEntry =
                {
                    id: '8888',
                    description: 'Some other product description',
                    price: 99.99,
                    quantity: 1000,
                    unit: 'bag'
                };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                scope.updateProduct = sinon.spy();

                scope.productToUpdate = productToUpdateBeforeCancelEntry;

                scope.saveEntryAndReturn();
            });

            it('should execute path function of the locationService with the route "/products"', function () {
                expect(locationServiceMock.path.calledWithExactly('/products')).toEqual(true);
            });

        });

        describe('executing saveEntry function.', function () {

            var productToUpdateBeforeCancelEntry;

            beforeEach(function () {

                productsDataServiceInstance.updateItem = sinon.spy();

                locationServiceMock.path = sinon.spy();
                
                productToUpdateBeforeCancelEntry =
                {
                    id: '8888',
                    description: 'Some other product description',
                    price: 99.99,
                    quantity: 1000,
                    unit: 'bag'
                };

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                scope.updateProduct = sinon.spy();

                scope.productToUpdate = productToUpdateBeforeCancelEntry;

                scope.saveEntry();
            });

            it('should not execute path function of the locationService with the route "/products"', function () {
                expect(locationServiceMock.path.calledWithExactly('/products')).toEqual(false);
            });

            it('should execute updateItem function of the productsDataService', function () {
                expect(productsDataServiceInstance.updateItem.called).toEqual(true);
            });

            it('should pass productToUpdate when executing updateItem function of the productsDataService', function () {
                expect(productsDataServiceInstance.updateItem.calledWithExactly(productToUpdateBeforeCancelEntry)).toEqual(true);
            });
        });
      
        describe('executing saveAndResetProductToUpdate function.', function () {

            beforeEach(function () {

                var controller = $controllerFactory("ProductEditorController", {
                    $scope: scope,
                    productsDataService: productsDataServiceInstance,
                    $routeParams: routeParamsService
                });

                scope.saveEntry = sinon.spy();
                scope.resetProductToUpdate = sinon.spy();

                scope.saveAndResetProductToUpdate();
            });

            it('should execute saveEntry function of the scope', function () {
                expect(scope.saveEntry.called).toEqual(true);
            });

            it('should execute resetProductToUpdate function of the scope', function () {
                expect(scope.resetProductToUpdate.called).toEqual(true);
            });


        });
        
    });
}());
