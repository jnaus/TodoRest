
var TodoApp = angular.module("TodoApp", ["ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'list.html' }).
            when('/new', { controller: CreateCtrl, templateUrl: 'detail.html' }).
            when('/edit/:editId', { controller: EditCtrl, templateUrl: 'detail.html' }).
            otherwise({ redirectTo: '/' });
    });


TodoApp.factory('Todo', function ($resource) {
    //return $resource('/api/todo/:id');
    //needed for PUT call.
    return $resource('/api/todo/:id', { id: '@id' }, { update: { method: 'PUT' } });
});


//Mock TODO....
//TodoApp.factory('Todo', function ($resource) {
//    return {
//        query: function () {
//            return [{ "TodoItemId": 1, "Todo": "todo1", "Priority": 1, "DueDate": "2013-04-13T10:10:54.447" },
//            { "TodoItemId": 2, "Todo": "todo2", "Priority": 2, "DueDate": "2013-04-13T10:10:54.447" }]
//        }
//    }
//});


var ListCtrl = function ($scope, $location, Todo) {
    $scope.todos = [];
    $scope.test = "My Test";
    $scope.name = "jimmy james";
    //sort
    $scope.sort_order = "Todo";
    $scope.is_desc = false;
    $scope.limit = 10;
    $scope.offset = 0;
    $scope.count = 10;

    $scope.search = function () {
        //$scope.todos = mockTodo.query();
        Todo.query({ q: $scope.query, sort: $scope.sort_order, desc: $scope.is_desc, limit: $scope.count },
            function (data) {
                $scope.todos = data;
            });
    }

    $scope.getMore = function () {
        Todo.query({ sort: $scope.sort_order, desc: $scope.is_desc, limit: $scope.limit, offset: $scope.offset },
            function (data) {
                $scope.todos = $scope.todos.concat(data);
            });
    }

    $scope.sort = function (col) {
        if ($scope.sort_order == col) {
            $scope.is_desc = !$scope.is_desc;
        } else {
            $scope.is_desc = false;
            $scope.sort_order = col;
        }
        $scope.search();
    }

    $scope.showMore = function () {
        $scope.offset += $scope.limit;
        $scope.count += $scope.limit;
        $scope.getMore();
    }

    $scope.addTodo = function () {
        var todoNew = new Todo();
        todoNew.Todo = $scope.name;
        todoNew.Priority = 4;
        todoNew.DueDate = "2013-04-13T10:10:54.447";

        todoNew.$save();
        //$scope.todos.push($resource(todoNew));
        $scope.todos.push(todoNew);
    };

    $scope.reset = function () {
        $scope.limit = 10;
        $scope.offset = 0;
        $scope.count = 10;
        $scope.search();
    }

    $scope.delete = function () {
        //inside ng-repeat scope.
        var id = this.todo.TodoItemId;
        var index = $scope.todos.indexOf(this.todo);
        //alert('delete id=' + this.todo.TodoItemId);
        Todo.delete({ "id": id }, function () {
            $("#todo_" + id).fadeOut();
        });
        //$scope.todos.splice(index,1);
    }

    $scope.search();

};
