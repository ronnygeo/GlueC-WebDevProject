/**
 * Created by ronnygeo on 3/6/16.
 */

(function (){

    angular.module('GluecApp')
        .controller('AdminDashboardController', AdminDashboardController);

    AdminDashboardController.$inject = ['$rootScope', 'UserService', 'CatalogService', 'ProductService'];
    function AdminDashboardController($rootScope, UserService, CatalogService, ProductService) {
        var vm = this;
        var user = $rootScope.user;
        var userId = user._id;

        //Event Handlers
        vm.selectUser = selectUser;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectCatalog = selectCatalog;
        vm.deleteCatalog = deleteCatalog;
        vm.addCatalog = addCatalog;
        vm.updateCatalog = updateCatalog;
        vm.selectProduct = selectProduct;
        vm.deleteProduct = deleteProduct;
        vm.addProduct = addProduct;
        vm.updateProduct = updateProduct;

        function addUser() {
            UserService.createUser(vm.user).then(function(data){
                vm.users.push(data.data);
                vm.user = {};
            });
        }

        function updateUser() {
            console.log(vm.user);
            UserService.updateUser(vm.user._id, vm.user).then(function(){
                vm.user = {};
            });
        }

        //Add to the edit boxes.
        function selectUser(index) {
            vm.user = vm.users[index];
        }

        function deleteUser(index) {
            UserService.deleteUserById(vm.users[index]._id).then(function(data){
                vm.users = data.data;
            });
        }

        function addCatalog() {
            CatalogService.createCatalog(userId, vm.catalog).then(function(data){
                console.log(data.data);
                vm.catalogs.push(data.data);
                vm.catalog = {};
            });
        }

        function updateCatalog() {
            console.log(vm.catalog);
            CatalogService.updateCatalog(userId, vm.catalog._id, vm.catalog).then(function(){
                vm.catalog = {};
            });
        }

        //Add to the edit boxes.
        function selectCatalog(index) {
            vm.catalog = vm.catalogs[index];
        }

        function deleteCatalog(index) {
            CatalogService.deleteCatalog(userId, vm.catalogs[index]._id).then(function(data){
                vm.catalogs = data.data;
            });
        }

        function addProduct() {
            ProductService.createProduct(userId, vm.product).then(function(data){
                vm.products.push(data.data);
                vm.products = {};
            });
        }

        function updateProduct() {
            ProductService.updateProduct(vm.user._id, vm.product._id, vm.product).then(function(){
                vm.product = {};
            });
        }

        //Add to the edit boxes.
        function selectProduct(index) {
            vm.product = vm.products[index];
        }

        function deleteProduct(index) {
            ProductService.deleteProduct(vm.products[index]._id).then(function(data){
                vm.products = data.data;
            });
        }

        angular.element(document).ready(function () {
            vm.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
            vm.data = [300, 500, 100];

            $('ul.tabs').tabs();


            vm.data = [
                {
                    value: 300,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Red"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Green"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Yellow"
                }
            ];

            vm.options = {
                //Boolean - Whether we should show a stroke on each segment
                segmentShowStroke : true,

                //String - The colour of each segment stroke
                segmentStrokeColor : "#fff",

                //Number - The width of each segment stroke
                segmentStrokeWidth : 2,

                //Number - The percentage of the chart that we cut out of the middle
                percentageInnerCutout : 50, // This is 0 for Pie charts

                //Number - Amount of animation steps
                animationSteps : 100,

                //String - Animation easing effect
                animationEasing : "easeOutBounce",

                //Boolean - Whether we animate the rotation of the Doughnut
                animateRotate : true,

                //Boolean - Whether we animate scaling the Doughnut from the centre
                animateScale : false,

                //String - A legend template
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

            };

            // And for a doughnut chart
            var ctx = $("#myChart").get(0).getContext("2d");
            var myDoughnutChart = new Chart(ctx).Doughnut(vm.data, vm.options);

            var ctx = $("#myChart2").get(0).getContext("2d");
            var myDoughnutChart2 = new Chart(ctx).Doughnut(vm.data, vm.options);

            var ctx = $("#myChart3").get(0).getContext("2d");
            var myDoughnutChart3 = new Chart(ctx).Doughnut(vm.data, vm.options);

        });
        
        UserService.findAllUsers().then(function (data) {
            vm.users = [];
            vm.users = data.data;
            vm.user = {};
        });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.catalogs = data.data;
            vm.catalog = {};
            // console.log(data.data);
        })

        ProductService.findAllProducts().then(function (data) {
            vm.products = data.data;
            vm.product = {};
            // console.log(data.data);
        })

    }

})();