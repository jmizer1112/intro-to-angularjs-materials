//'use strict';

////retrieve the module DO NOT FORGET THE DEPENDENCY COLLECTION OR AN ERROR WILL OCCOUR
var inventoryApplication = angular.module('inventoryApplication', []);

FilterSettings = function () {

    var toggleFilteringForColumnFunction = function (filterSettings, columnName) {
        var loweredColumnName = columnName.toLowerCase();
        var indexOfFilteredWordInColumnName = filterSettings.columnTitles[columnName].indexOf('filtered');
        if (indexOfFilteredWordInColumnName != -1) {
            filterSettings.columnTitles[columnName] = filterSettings.columnTitles[columnName].replace('(filtered)', '');
            if (filterSettings.filterInstance.hasOwnProperty(loweredColumnName))
                delete filterSettings.filterInstance[loweredColumnName];
        } else {
            filterSettings.columnTitles[columnName] = filterSettings.columnTitles[columnName] + '(filtered)';

            filterSettings.filterInstance[loweredColumnName] = null;
        }
    };

    var filterSettingsInstance = {
        columnTitles:
            {
                Description: 'Description',
                Price: 'Price',
                Quantity: 'Quantity',
                Unit: 'Unit'
            },
        filterInstance: {},
        toggleFilteringForColumn: toggleFilteringForColumnFunction
    };

    return filterSettingsInstance;
};


//Add a controller to the module
inventoryApplication.controller('ProductsController', [
    '$scope', function ProductsController($scope) {

        $scope.filterSettings = new FilterSettings();

        $scope.filterProductComparer = function (itemToCheck, index) {
            var includeItem = true;
            var filterInstanceReference = $scope.filterSettings.filterInstance;
            if ($scope.filterText) {
                var hasProperties = false;
                includeItem = false;
                for (var namedProperty in filterInstanceReference) {
                    hasProperties = true;
                    if (filterInstanceReference.hasOwnProperty(namedProperty) && itemToCheck.hasOwnProperty(namedProperty) && itemToCheck[namedProperty]) {
                        var filterTextUpperCase = '', itemPropertyValueUpperCase;
                        if ($scope.filterText) {
                            filterTextUpperCase = $scope.filterText.toUpperCase();

                            itemPropertyValueUpperCase = String(itemToCheck[namedProperty]).toUpperCase();

                            if (itemPropertyValueUpperCase.indexOf(filterTextUpperCase) != -1) {
                                includeItem = true;
                                break;
                            }
                        } else includeItem = true;
                    }
                }

                includeItem = hasProperties ? includeItem : true;
            }

            return includeItem;
        }


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
                { id: '0006', description: 'Coke', price: 1.50, quantity: 250, unit: 'bottle' },
                { id: '0007', description: 'Beer2', price: 20, quantity: 20, unit: 'case' },
                { id: '0008', description: 'Beer3.', price: 20, quantity: 20, unit: 'case' },
                { id: '0009', description: 'Beer2', price: 20, quantity: 20, unit: 'case' },
                { id: '0010', description: 'Beer2', price: 20.75, quantity: 20, unit: 'case' }
            ]
        }
    }
]);
