function filterSettings(columnTitles) {

    var toggleFilteringForColumnFunction = function (columnName) {
        var loweredColumnName = columnName.toLowerCase();
        var indexOfFilteredWordInColumnName = this.columnTitles[columnName].indexOf('filtered');
        if (indexOfFilteredWordInColumnName != -1) {
            this.columnTitles[columnName] = this.columnTitles[columnName].replace('(filtered)', '');
            if (this.filterInstance.hasOwnProperty(loweredColumnName))
                delete this.filterInstance[loweredColumnName];
        } else {
            this.columnTitles[columnName] = this.columnTitles[columnName] + '(filtered)';

            this.filterInstance[loweredColumnName] = null;
        }
    };

    var itemPropertyValueContainsFilterText = function (itemPropertyValue, filterText) {

        var filterTextUpperCase = filterText.toUpperCase();

        var itemPropertyValueUpperCase = String(itemPropertyValue).toUpperCase();

        return itemPropertyValueUpperCase.indexOf(filterTextUpperCase) != -1;
    };

    var itemToCheckAndFilterTemplateContainProperty = function (itemToCheck, filterInstance, namedProperty) {
        return filterInstance.hasOwnProperty(namedProperty) && itemToCheck.hasOwnProperty(namedProperty) && itemToCheck[namedProperty];
    };


    var compareItemToFilterFunction =
        function (itemToCheck, index) {
            if (!this.filterInstance)
                return true;

            var includeItem = true;
            //var filterInstanceReference = filterInstance;
            var filterText = this.filterText;
            var filterInstanceReference = this.filterInstance;


            if (filterText) {
                var hasProperties = false;
                includeItem = true;
                for (var namedProperty in filterInstanceReference) {
                    hasProperties = true;
                    if (itemToCheckAndFilterTemplateContainProperty(itemToCheck, filterInstanceReference, namedProperty)) {

                        var containsFilterText = itemPropertyValueContainsFilterText(itemToCheck[namedProperty], filterText);

                        includeItem = containsFilterText;

                        if (includeItem) {
                            break;
                        }
                    }
                }

                includeItem = hasProperties ? includeItem : true;
            }

            return includeItem;
        };

    var filterSettingsInstance = {
        filterText: '',
        columnTitles: columnTitles,
        filterInstance: {},
        toggleFilteringForColumn: toggleFilteringForColumnFunction,
        compareItemToFilter: compareItemToFilterFunction
    };

    return filterSettingsInstance;
};