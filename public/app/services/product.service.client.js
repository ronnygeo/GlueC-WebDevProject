/**
 * Created by Bhanu on 03/03/2016.
 */

"use strict";
(function () {
    angular
        .module("GluecApp")
        .factory("ProductService", ProductService);

    ProductService.$inject = ['$http'];

    function ProductService($http) {

        var api = {
            findProductById: findProductById,
            findAllProductsByUserId: findAllProductsByUserId,
            findAllProductsByCatalogId: findAllProductsByCatalogId,
            findAllProducts: findAllProducts,
            createProduct: createProduct,
            updateProduct: updateProduct,
            deleteProduct: deleteProduct
        };
        return api;

        function findProductById(prodId) {
            return $http.get("/api/product/" + prodId);
        }

        function findAllProductsByUserId(userId) {
            return $http.get("/api/user/" + userId + "/products")
        }

        function findAllProductsByCatalogId(catId) {
            return $http.get("/api/catalog/" + catId + "/products");
        }

        function findAllProducts() {
            return $http.get("/api/products");
        }

        function createProduct(userId, product) {
            return $http.post("/api/user/" + userId + "/product", product);
        }

        function updateProduct(userId, prodId, product) {
            return $http.put('/api/user/' + userId + '/product/' + prodId, product);
        }

        function deleteProduct(userId, prodId) {
            return $http.delete('/api/user/' + userId + '/product/' + prodId);
        }
    }
})();