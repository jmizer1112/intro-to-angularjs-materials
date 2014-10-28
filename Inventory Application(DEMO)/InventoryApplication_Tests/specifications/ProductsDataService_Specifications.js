'use strict';

/// <reference path="Scripts/sinon-1.9.1.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-resource.js"/>
/// <reference path="../inventoryApplication/app/lib/angular/angular-route.js"/>
/// <reference path="Scripts/angular/angular-mocks.js"/>
/// <reference path="../inventoryApplication/app/Scripts/Services/ProductsDataService.js"/>

(function () {
    describe('The Products Data Service', function () {

        var productsDataService, httpMock;

        beforeEach(function () {

            httpMock = {};
            angular.mock.module('inventoryApplication');

            module(function ($provide) {
                $provide.value('$http', httpMock);
            });

            inject(function ($injector) {
                productsDataService = $injector.get('productsDataService');
            });


        });

        it('Should create a collection of products', function () {

            var productsFromProductsDataService = productsDataService.getProducts();

            expect(productsFromProductsDataService.length).toBe(10);
        });


        it('Should allow a product to be added a product to the collection', function () {

            var productToAddToTheList = {
                id: '0011',
                description: 'Hot Dog',
                price: .75,
                quantity: 2000,
                unit: 'ea'
            };

            productsDataService.addItem(productToAddToTheList);

            var productsFromProductsDataServiceAfterAdd = productsDataService.getProducts();

            expect(productsFromProductsDataServiceAfterAdd[productsFromProductsDataServiceAfterAdd.length - 1]).toBe(productToAddToTheList);

        });

        it('should add a product to the collection when newItemFlag is set', function() {

            var productToAddToTheList = {
                id: '0011',
                description: 'Hot Dog',
                price: .75,
                quantity: 2000,
                unit: 'ea',
                newItem:true
            };
            
            var productAddedToCollection =
            {
                id: '0011',
                description: 'Hot Dog',
                price: .75,
                quantity: 2000,
                unit: 'ea'
            };


            productsDataService.updateItem(productToAddToTheList);

            var productsFromProductsDataServiceAfterAdd = productsDataService.getProducts();

            expect(productsFromProductsDataServiceAfterAdd[productsFromProductsDataServiceAfterAdd.length - 1]).toEqual(productAddedToCollection);

        });

        it('Should allow a product to be removed from the collection', function () {

            var productsFromProductsDataServiceBeforeRemove = productsDataService.getProducts();
            var productToRemove;

            for (var index = 0; index < productsFromProductsDataServiceBeforeRemove.length; index++) {
                if (productsFromProductsDataServiceBeforeRemove[index].id === '0009') {
                    productToRemove = productsFromProductsDataServiceBeforeRemove[index];
                }
            }

            productsDataService.removeItem(productToRemove);

            var productsFromProductsDataServiceAfterRemove = productsDataService.getProducts();

            expect(productsFromProductsDataServiceAfterRemove.length).toBe(9);
        });

        it('should set a flag called newItem to indicate that an item is new',
            function () {
                var productCreated;

                productCreated = productsDataService.getNewItem();

                expect(productCreated.newItem).toEqual(true);
            }
        );

        it('should set description of a new product to blank',
            function() {
                var productCreated;

                productCreated = productsDataService.getNewItem();

                expect(productCreated.description).toEqual('');
            }
        );

        it('should set price of a new product to blank',
            function () {
                var productCreated;

                productCreated = productsDataService.getNewItem();

                expect(productCreated.price).toEqual('');
            }
        );

        it('should set quantity of a new product to blank',
            function () {
                var productCreated;

                productCreated = productsDataService.getNewItem();

                expect(productCreated.quantity).toEqual('');
            }
        );
        
        it('should set unit of a new product to blank',
            function () {
                var productCreated;

                productCreated = productsDataService.getNewItem();

                expect(productCreated.unit).toEqual('');
            }
        );

        it('should allow a new product to be created',
            function () {
                var productCreated, productAdded;

                var existingIds = '';

                var productsToSearch = productsDataService.getProducts();

                for (var index = 0; index < productsToSearch.length; index++) {
                    existingIds = existingIds.concat(', '.concat(productsToSearch[index].id));

                }

                productCreated = productsDataService.getNewItem();
                
                expect(existingIds).toBeDefined();
                expect(existingIds).toNotEqual('');
                expect(existingIds.indexOf(productCreated.id)).toBe(-1);
            }
        );


        it('should allow a product to be retrieved by id',
            function () {
                var firstProduct, productRetrieved;

                var productsToSearch = productsDataService.getProducts();

                firstProduct = productsToSearch[0];

                var productRetrieved = productsDataService.getProductById(firstProduct.id);

                expect(firstProduct).toBeDefined();

                expect(productRetrieved).toBe(firstProduct);
            }
        );

        it('should not update a product in the collection for a product with no id',
            function () {
                var productUpdated, productAfterUpdate;

                productUpdated = {
                    id: '',
                    description: '',
                    price: '',
                    quantity: '',
                    unit: ''
                };

                productsDataService.updateItem(productUpdated);

                var productsFromProductsDataServiceAfterUpdate = productsDataService.getProducts();

                for (var index = 0; index < productsFromProductsDataServiceAfterUpdate.length; index++) {
                    if (productsFromProductsDataServiceAfterUpdate[index].id === '') {
                        productAfterUpdate = productsFromProductsDataServiceAfterUpdate[index];
                    }
                }


                expect(productAfterUpdate).toBeUndefined();
            }
        );

        it('Should update a product in the collection', function () {
            var productsFromProductsDataServiceBeforeRemove = productsDataService.getProducts();
            var productToUpdate, productUpdated, productAfterUpdate;

            for (var index = 0; index < productsFromProductsDataServiceBeforeRemove.length; index++) {
                if (productsFromProductsDataServiceBeforeRemove[index].id === '0009') {
                    productToUpdate = productsFromProductsDataServiceBeforeRemove[index];
                }
            }

            var updatedDescription = "This Is a Test";

            productUpdated = {
                id: productToUpdate.id,
                description: updatedDescription,
                price: productToUpdate.price,
                quantity: productToUpdate.quantity,
                unit: productToUpdate.unit
            };

            productsDataService.updateItem(productUpdated);

            var productsFromProductsDataServiceAfterUpdate = productsDataService.getProducts();

            for (var index = 0; index < productsFromProductsDataServiceAfterUpdate.length; index++) {
                if (productsFromProductsDataServiceAfterUpdate[index].id === '0009') {
                    productAfterUpdate = productsFromProductsDataServiceAfterUpdate[index];
                }
            }



            expect(productAfterUpdate.description).toEqual(updatedDescription);
        });
    });

}())