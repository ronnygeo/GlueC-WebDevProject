    /**
     * Created by Bhanu on 08/04/2016.
     */

    "use strict";
    (function () {

        angular
            .module("GluecApp")
            .factory("ListingService", ListingService);

        function ListingService($http) {
            var api = {
                getNewListingTemplate: getNewListingTemplate,
            };
            return api;

            function getNewListingTemplate(listing) {
                console.log("Calling Server getNewListingTemplate");
                console.log(listing);
                var fd = new FormData();
                for (var key in listing) {
                    if(listing[key]){
                        fd.append(key, listing[key]);
                    }
                }
                var url = "/api/listing/";
                console.log(url);
                console.log(fd);
                return $http.post(
                    url,
                    fd,
                    {
                        transformRequest: angular.indentity,
                        headers: {'Content-Type': undefined}
                    }
                );
            }

        }


    })();