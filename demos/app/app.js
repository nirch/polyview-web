
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

    $scope.isNotPolyview = function() {
        return isOlin() || isGruper(); 
    }

    function isOlin() {
        return $location.path().includes("floor_plan") ? true : false;
    }

    function isGruper() {
        return $location.path().includes("grouper") ? true : false;
    }

    $scope.getCopyright = function() {
        if (isOlin()) 
            return "OLIN";
        else if (isGruper()) 
            return "Gruper";
        else 
            return "Polyview";
    }

    $scope.getLogoSrc = function() {
        if (isOlin()) 
            return "assets/OLIN.jpg";
        else if (isGruper()) 
            return "assets/Grouper_logo.jpg";
        else return "";
    }

    $scope.getHref = function() {
        if (isOlin()) 
            return "https://olin.co.il/";
        else if (isGruper()) 
            return "https://www.gruper-ltd.com/";
        else 
            return "https://www.facebook.com/Polyview3d/";
    }

    $scope.getLogoClass = function() {
        if (isOlin())
            return "olin-logo";
        else 
            return "gruper-logo";
    }
});
