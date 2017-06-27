(function(){
    'use strict';

    angular
        .module('app')
        .controller('TodoController', TodoController)

    TodoController.$inject = [];

    function TodoController() {
        var vm = this;

        vm.newTodo = {};
        vm.todos = [];
        vm.addTodo = addTodo;
        vm.removeTodo = removeTodo;

        //////////

        function addTodo(todo) {
            vm.todos.push(todo);
            vm.newTodo = {};
        }

        function removeTodo(todo) {
            var index = vm.todos.indexOf(todo);
            vm.todos.splice(index, 1);
        }
    }
})();