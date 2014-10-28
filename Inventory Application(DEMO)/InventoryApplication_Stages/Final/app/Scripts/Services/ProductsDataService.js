//'use strict';

inventoryApplication.factory('productsDataService', [
 '$http', function ($http) {

     var productsCollection = [
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
         return this.products;
     };

     var padRight = function (stringToPad, maximumCharactersInString) {

         stringToPad = stringToPad.toString();
         return stringToPad.length < maximumCharactersInString ? padRight('0' + stringToPad, maximumCharactersInString) : stringToPad;
     }


     ;

     var getNewItemMethod = function () {

         var newId = this.lastId + 1;
         this.lastId = newId;

         return {
             id: padRight(this.lastId, 4),
             description: '',
             price: '',
             quantity: '',
             unit: '',
             newItem: true
         };
     };

     var addItemMethod = function (itemToAdd) {
         this.products.push(itemToAdd);
     };

     var removeItemMethod = function (itemToRemove) {
         var productToRemoveIndex = getIndexOfProduct(this.products, itemToRemove.id);
         
         if (productToRemoveIndex >= 0)
             this.products.splice(productToRemoveIndex, 1);
     };

     var updateItemMethod = function (itemToUpdate) {
         if (!itemToUpdate.hasOwnProperty('newItem')) {

             var index = getIndexOfProduct(this.products, itemToUpdate.id);

             var targetOfUpdate = this.products[index];

             if (targetOfUpdate) {
                 targetOfUpdate.description = itemToUpdate.description;
                 targetOfUpdate.price = itemToUpdate.price;
                 targetOfUpdate.quantity = itemToUpdate.quantity;
                 targetOfUpdate.unit = itemToUpdate.unit;
             }
         } else {
             delete itemToUpdate['newItem'];
             this.addItem(itemToUpdate);
         }
     };

        var getIndexOfProduct = function(productsCollection, idOfItemToRetrieve) {
            var productIndex;
            for (var index = 0; index < productsCollection.length; index++) {
                if (productsCollection[index].id === idOfItemToRetrieve) {
                    productIndex = index;
                    break;
                }
            }

            return productIndex;
        };

        var getProductByIdFunction = function (idOfItemToRetrieve) {

            var index = getIndexOfProduct(this.products, idOfItemToRetrieve);

            return this.products[index];
     };

     var productsDataServiceInstance = {
         lastId: 11,
         products: productsCollection,
         getProducts: getProductsMethod,
         getNewItem: getNewItemMethod,
         addItem: addItemMethod,
         removeItem: removeItemMethod,
         updateItem: updateItemMethod,
         getProductById: getProductByIdFunction
     };

     return productsDataServiceInstance;
 }
]);
