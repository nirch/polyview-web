
demoApp.controller('demoCtrl', function($scope, $sce, $location, $window) {
    var models = {
        "office-chair": {
            name: "Office Chair",
            claraId: "0f0e7e13-c57b-471d-b3b6-4091bd051ab0"
        },
        "tanning-bed": {
            name: "Tanning Bed",
            claraId: "c9fd9abe-67cc-43c7-96e1-d8ecf59c68af"
        },
        "kara-armchair": {
            name: "Kara Armchair",
            claraId: "597cbc9c-7ae6-47a0-bbc7-440691cc8987"            
        },
        "wooden-train": {
            name: "Wooden Train",
            claraId: "fad35c6d-6e49-4f4e-b7ee-fe154e5599dd"            
        },
        "luxury-lamp": {
            name: "Luxury Lamp",
            claraId: "41909d38-403c-4a6b-806b-0996f83e7ea1"            
        },
        "brown-leather-sofa": {
            name: "Brown Leather Sofa",
            claraId: "88775df1-b3a5-4fc5-8425-90b785d2e5bf"            
        }
    }

    // Getting the model id from the URL and checking it exists
    var modelId = $location.path().substring(1, $location.path().length);
    var model = models[modelId];
    if (!model) {
        // Sending the user back to the landing page if the model url doesn't exist
        $window.location.href = "http://www.polyview3d.com";
    } else {
        $scope.modelName = model.name;
        $scope.claraEmbedUrl = $sce.trustAsResourceUrl("https://clara.io/player/v2/" + model.claraId + "?tools=hide");    

        gtag('event', 'view_item', {
            'event_category': 'models',
            'event_label': model.name
        });
    }
});