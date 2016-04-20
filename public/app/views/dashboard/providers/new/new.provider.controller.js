(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("NewProviderController", NewProviderController);

    NewProviderController.$inject = ['ProviderService', '$location', '$rootScope'];

    function NewProviderController(ProviderService, $location, $rootScope) {

        var NewProviderController = this;
        NewProviderController.addNewProvider = addNewProvider;

        function addNewProvider() {
            var newProvider = NewProviderController.provider;
            newProvider.userId = $rootScope.user._id;
            if (NewProviderController.provider.name.toUpperCase() == 'EBAY') {
                newProvider.name = "eBay";
                newProvider.code = "10001";
            } else if (NewProviderController.provider.name.toUpperCase() == 'AMAZON') {
                newProvider.name = "Amazon";
                newProvider.code = "10002";
            }else{
                return
            }

            ProviderService.addProviderForUser(newProvider)
                .then(function (response) {
                        console.log(response.data);
                        $location.url("/dashboard/providers");
                    }, function (err) {
                        console.log(err);
                    }
                )
        }


    }
})();