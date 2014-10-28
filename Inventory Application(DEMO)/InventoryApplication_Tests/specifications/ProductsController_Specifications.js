'use strict';

/// <reference path="Scripts/sinon-1.9.1.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-resource.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-route.js"/>
/// <reference path="Scripts/angular/angular-mocks.js"/>

/// <reference path="../InventoryApplication/app/Scripts/Services/ProductsDataService.js"/>
/// <reference path="../InventoryApplication/app/Scripts/Controllers/ProductsController.js"/>


(function () {
    describe('During Construction of Products Controller', function () {
        var scope, $controllerFactory, productsDataServiceInstance, httpMock, locationServiceMock;

        httpMock = {};
        locationServiceMock = {};

        var mockGetProductsMethod = function () {
            return [
            { id: '0001', description: 'Beer', price: 20, quantity: 20, unit: 'case' },
            { id: '0002', description: 'Chips', price: 2, quantity: 50, unit: 'bag' },
            { id: '0003', description: 'Snickers', price: 1.5, quantity: 75, unit: 'ea' }

            ];
        };

        productsDataServiceInstance = {
            getProducts: mockGetProductsMethod
        };

        beforeEach(
            function () {


                module('inventoryApplication');

                module(function ($provide) {
                    $provide.value('$http', httpMock);
                    $provide.value('productsDataService', productsDataServiceInstance);
                    $provide.value('$location', locationServiceMock);
                });

                inject(function ($rootScope, $controller) {
                    scope = $rootScope.$new();
                    $controllerFactory = $controller;
                });

                locationServiceMock.path = sinon.spy();

                var controller = $controllerFactory("ProductsController", {
                    $scope: scope,
                    $location: locationServiceMock,
                    productsDataService: productsDataServiceInstance
                });
            });

        it('should intiailize the Store Name to Gettin Store',
            function () {

                expect(scope.store.name).toBe('Gettin Store');
            });



        it('should initialize products by issuing a call to getProducts function of the products data service .',
            function () {
                console.log(scope.store.products);
                expect(scope.store.products).toEqual(productsDataServiceInstance.getProducts());
            });

        it('should initialize the filter settings for the description property',
                function () {
                    expect(scope.filterSettings.columnTitles['Description']).toBeDefined();
                });

        it('should initialize the filter settings for the price property',
                function () {
                    expect(scope.filterSettings.columnTitles['Price']).toBeDefined();
                });

        it('should initialize the filter settings for the quantity property',
                function () {
                    expect(scope.filterSettings.columnTitles['Quantity']).toBeDefined();
                });

        it('should initialize the filter settings for the unit property',
                function () {
                    expect(scope.filterSettings.columnTitles['Unit']).toBeDefined();
                });

        it('should not initialize the filter settings for the id property',
        function () {
            expect(scope.filterSettings.columnTitles['Id']).toBeUndefined();
            expect(scope.filterSettings.columnTitles['id']).toBeUndefined();
        });

        it('should initialize the sortProperty value to blank',
        function () {
            expect(scope.sortProperty).toBeDefined();
            expect(scope.sortProperty).toEqual('');
        });


        it('should initialize the sortDescending value to false',
        function () {
            expect(scope.sortDescending).toEqual(false);
        });


        describe('execution of the toggleSortDirection function', function () {

            it('should set the sortDescending value to true when the toggleSortDirection function is executed and the value of the sortDescendingProperty is false',
            function () {
                scope.sortDescending = false;
                scope.toggleSortDirection();
                expect(scope.sortDescending).toEqual(true);
            });

            it('should set the sortDescending value to false when the toggleSortDirection function is executed and the value of the sortDescendingProperty is true',
            function () {
                scope.sortDescending = true;
                scope.toggleSortDirection();
                expect(scope.sortDescending).toEqual(false);
            });
        });


        describe('When executing functions to support product collection updates.', function () {

            describe('executing addNewProduct function.', function () {
                var newProductFromProductDataServices;
                beforeEach(function () {
                    newProductFromProductDataServices =
                    {
                        id: '8888',
                        description: 'Some other product description',
                        price: 99.99,
                        quantity: 1000,
                        unit: 'bag'
                    };

                    productsDataServiceInstance.getNewItem = function () { return newProductFromProductDataServices; };

                    scope.addNewProduct();
                });

                it('should execute path function of the locationService with the route "/editproduct"', function () {
                    expect(locationServiceMock.path.calledWithExactly('/editproduct')).toEqual(true);
                });
            });

            describe('executing editProduct function.', function () {
                var productToEdit;
                beforeEach(function () {
                    productToEdit =
                    {
                        id: 'TEST_ITEM_EDIT',
                        description: 'Some other product description',
                        price: 99.99,
                        quantity: 1000,
                        unit: 'bag'
                    };

                    scope.editProduct(productToEdit);
                });

                it('should execute path function of the locationService with the route "/editproduct/TEST_ITEM_EDIT"', function () {
                    expect(locationServiceMock.path.calledWithExactly('/editproduct/TEST_ITEM_EDIT')).toEqual(true);
                });
            });

            describe('executing removeProduct function.', function () {

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

                    productsDataServiceInstance.removeItem = sinon.spy();
                    productsDataServiceInstance.getProducts = sinon.spy();
                    scope.removeProduct(productToUpdateBeforeCancelEntry);
                });

                it('should execute removeItem function of the productsDataServiceInstance', function () {
                    expect(productsDataServiceInstance.removeItem.called).toEqual(true);
                });
                
                it('should execute removeItem function of the productsDataServiceInstance', function () {
                    expect(productsDataServiceInstance.removeItem.calledWithExactly(productToUpdateBeforeCancelEntry)).toEqual(true);
                });

                it('should execute getProducts function of the productsDataServiceInstance', function () {
                    expect(productsDataServiceInstance.getProducts.called).toEqual(true);
                });


            });

        });

    });
}());
