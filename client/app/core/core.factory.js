(function(){
    'use strict';

    angular
        .module('app')
        .factory('TodoFactory', TodoFactory)

    TodoFactory.$inject = ['$http'];

    function TodoFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() { }
    }
})();   