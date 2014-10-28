'use strict';

(function() {
    describe('During Construction of Products Controller', function() {
        var scope, controller;

        beforeEach(function() {

            module('demoApp');

            inject(function($rootScope, $controller) {
                scope = $rootScope.$new();
                controller = $controller('ProductsController', { $scope: scope });
            });

        });


        it('should set the Store Name to Gettin Store',
            function() {
                expect(scope.storeName).toBe('Gettin Store');
            });

    });
}());