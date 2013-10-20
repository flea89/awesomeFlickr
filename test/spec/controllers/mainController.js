'use strict';

xdescribe('Controller: MaincontrollerCtrl', function () {

    // load the controller's module
    beforeEach(module('potatoFlickrApp'));

    var MaincontrollerCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MaincontrollerCtrl = $controller('MainController', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});