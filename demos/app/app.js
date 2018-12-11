
var app = angular.module('demosApp', ['ngRoute', 'ng.deviceDetector']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'app/gallery/demoGallery.html',
      controller: 'demoGalleryCtrl'
    }).when('/ios12', {
        templateUrl: 'app/ios12/ios12.html'
    }).when('/:modelKey', {
        templateUrl: 'app/item/demoItem.html',
        controller: 'demoItemCtrl'
    })
});

app.controller('navCtrl', function($scope, $location, modelService) {
    $scope.models = modelService.models;
    modelService.load();

    // Not showing the "more demos" link in two cases: (1) we are in the gallery page;
    // (2) we are in a model page which is "unlisted"
    $scope.showMoreDemosMenu = function() {
        if ($location.path() === "/") {
            return false;
        } else {
            var modelKey = $location.path().substr(1, $location.path().length - 1)
            if ($scope.models[modelKey] && !$scope.models[modelKey].unlisted) {
                return true;
            } else {
                return false;
            }
        }
    }
});

app.controller('footerCtrl', function($scope, $location, modelService) {

    $scope.isOlin = function() {
        return $location.path().includes("floor_plan") ? true : false;
    }

    $scope.getCopyright = function() {
        return $scope.isOlin() ? "OLIN" : "Polyview";
    }

    $scope.getHref = function() {
        return $scope.isOlin() ? "https://olin.co.il/" : "https://www.facebook.com/Polyview3d/";
    }
});
