//'use strict';

inventoryApplication.factory('productsDataService', [
 '$http', function ($http) {

     var products = [
         { id: '0001', description: 'Beer', price: 20, quantity: 20, unit: 'case' },
         { id: '0002', description: 'Chips', price: 2, quantity: 50, unit: 'bag' },
         { id: '0003', description: 'Snickers', price: 1.5, quantity: 75, unit: 'ea' },
         { id: '0004', description: 'Jolly Rancher', price: .25, quantity: 250, unit: 'case' },
         { id: '0005', description: 'Pepsi', price: 1.75, quantity: 200, unit: 'bottle' },
         { id: '0006', description: 'Coke', price: 1.50, quantity: 250, unit: 'bottle' },
         { id: '0007', description: 'Beer2', price: 20, quantity: 20, unit: 'case' },
         { id: '0008', description: 'Beer3.', price: 20, quantity: 20, unit: 'case' },
         { id: '0009', description: 'Beer2', price: 20, quantity: 20, unit: 'case' },
         { id: '0010', description: 'Beer2', price: 20.75, quantity: 20, unit: 'case' }
     ];

     var getProductsMethod = function () {
         return products;
     };

     var addItemMethod = function (itemToAdd) {
         products.push(itemToAdd);
     };

     var removeItemMethod = function (itemToRemove) {
         var productToRemoveIndex;
         for (var index = 0; index < products.length; index++) {
             if (products[index].id === itemToRemove.id) {
                 productToRemoveIndex = index;
                 break;
             }
         }

         if (productToRemoveIndex)
             products.splice(productToRemoveIndex, 1);
     }

     var productsDataServiceInstance = {
         getProducts: getProductsMethod,
         addItem: addItemMethod,
         removeItem: removeItemMethod
     };

     return productsDataServiceInstance;
 }
]);
