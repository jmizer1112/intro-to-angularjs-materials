//'use strict';

////retrieve the module DO NOT FORGET THE DEPENDENCY COLLECTION OR AN ERROR WILL OCCOUR

FilterSettings = function (columnTitles) {

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
        columnTitles: columnTitles,
        filterInstance: {},
        toggleFilteringForColumn: toggleFilteringForColumnFunction
    };

    return filterSettingsInstance;
};

//Add a controller to the module
inventoryApplication.controller('ProductsController', [
    '$scope', 'productsDataService', function ($scope, productsDataService) {

        $scope.filterSettings = new FilterSettings(
            {
                Description: 'Description',
                Price: 'Price',
                Quantity: 'Quantity',
                Unit: 'Unit'
            });

        $scope.filterProductComparer = function (itemToCheck, index) {

            var upperCasePropertyValueContainsFilterText = function (itemPropertyValueUpperCase) {
                var filterTextUpperCase = '';
                filterTextUpperCase = $scope.filterText.toUpperCase();

                itemPropertyValueUpperCase = String(itemToCheck[namedProperty]).toUpperCase();

                return itemPropertyValueUpperCase.indexOf(filterTextUpperCase) != -1;
            };

            var includeItem = true;
            var filterInstanceReference = $scope.filterSettings.filterInstance;
            if ($scope.filterText) {
                var hasProperties = false;
                includeItem = false;
                for (var namedProperty in filterInstanceReference) {
                    hasProperties = true;
                    if (filterInstanceReference.hasOwnProperty(namedProperty) && itemToCheck.hasOwnProperty(namedProperty) && itemToCheck[namedProperty]) {
                        if ($scope.filterText) {
                            var propertyValueContainsFilterText =
                           upperCasePropertyValueContainsFilterText(String(itemToCheck[namedProperty]).toUpperCase());

                            if (propertyValueContainsFilterText) {
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
            products: productsDataService.getProducts()
        }


    }
]);