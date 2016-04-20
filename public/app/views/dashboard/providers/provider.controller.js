(function () {
    "use strict";
    angular
        .module('GluecApp')
        .controller("ProviderController", ProviderController);

    ProviderController.$inject = ['ProviderService', '$rootScope', '$location'];

    function ProviderController(ProviderService, $rootScope, $location) {

        var ProviderController = this;
        ProviderController.deleteProvider = deleteProvider;

        function init() {
            getAllProvidersForUser();
        }

        init();

        function getAllProvidersForUser() {
            ProviderService.getProvidersForUser($rootScope.user._id)
                .then(function (response) {
                        console.log(response.data);
                        ProviderController.providers = response.data;
                    }, function (err) {
                        console.log(err);
                    }
                )
        }

        function deleteProvider(providerId) {
            console.log("deleteProvider");
            if (!providerId) {
                return
            }
            ProviderService.deleteProvider(providerId)
                .then(function (response) {
                        console.log(response.data);
                        for (var i in ProviderController.providers) {
                            if (ProviderController.providers[i]._id == providerId)
                                ProviderController.providers.splice(i, 1);
                        }
                    }, function (err) {
                        console.log(err);
                    }
                )
        }
    }
})();