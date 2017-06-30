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
        vm.value = 0;

        //////////

        function addTodo(todo) {
            vm.newTodo = {
                item: vm.newTodo.text,
                priority: vm.value[0],
                priorityDescrption: vm.value[1]
            }
            console.log(vm.newTodo);
            $http
                .post('/todos', vm.newTodo)
                .then(response => {
                    console.log('You added a todo!')
                });
                vm.todos.push(vm.newTodo);
                activate();
                console.log(vm.value);
        }

        function removeTodo(todo) {
            var index = vm.todos.indexOf(todo);
            var id = (vm.todos[index]._id)
            console.log(id);
            vm.todos.splice(index, 1);
            $http
                .delete('/todos/' + id)
                .then(res => {
                    console.log('You removed a todo');
                });

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