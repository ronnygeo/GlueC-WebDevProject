/**
 * Created by ronnygeo on 3/6/16.
 */

(function (){

    angular.module('GluecApp')
        .controller('AdminDashboardController', AdminDashboardController)
        .controller("DoughnutCtrl", DoughnutCtrl);

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
            vm.product.roles = vm.product.roles.split(',');
            ProductService.createProduct(userId, vm.product).then(function(data){
                vm.products.push(data.data);
                vm.products = data;
                vm.product = {};
            });
        }

        function updateProduct() {
            vm.product.roles = vm.product.roles.split(',');
            ProductService.updateProduct(vm.user._id, vm.product._id, vm.product).then(function(){
                vm.product = {};
            });
        }

        //Add to the edit boxes.
        function selectProduct(index) {
            vm.product = vm.products[index];
        }

        function deleteProduct(index) {
            ProductService.deleteProduct(userId, vm.products[index]._id).then(function(data){
                vm.products = data.data;
            });
        }

        angular.element(document).ready(function () {
            $('ul.tabs').tabs();
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
        });

    }

    DoughnutCtrl.$inject = ['ProductService', 'CatalogService', 'UserService'];
    function DoughnutCtrl(ProductService, CatalogService, UserService) {

        var vm = this;
        vm.labels = ["Total Users", "Total Catalogs", "Total Products"];
        vm.data = [1, 1, 1];

        UserService.findAllUsers().then(function (data) {
            vm.data[0] = data.data.length;
        });

        CatalogService.findAllCatalogs().then(function (data) {
            vm.data[1] = data.data.length;
        });

        ProductService.findAllProducts().then(function (data) {
            vm.data[2] = data.data.length;
        });
    }

})();