(function(){
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController)

    TodoController.$inject = ['$http'];

    function TodoController($http) {
        var vm = this;

        vm.newTodo = {};
        vm.todos = [];
        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;

        //////////

        function addTodo(todo) {
            vm.newTodo = {
                item: vm.newTodo.text
            }
            $http
                .post('/todos', vm.newTodo)
                .then(response => {
                    console.log('You added a todo!')
                });
                vm.todos.push(vm.newTodo);
        }

        function removeTodo(todo) {
            var index = vm.todos.indexOf(todo);
            vm.todos.splice(index, 1);

        }

        activate();

        function activate() { 
            $http
                .get('/todos')
                .then(res => {
                    vm.todos = res.data;
                });
        }
    }
})();