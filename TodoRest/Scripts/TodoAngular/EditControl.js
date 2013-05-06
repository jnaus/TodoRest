
var EditCtrl = function ($scope, $location, $routeParams, Todo) {

    $scope.action = "Update";

    var id = $routeParams.editId;
    $scope.item = Todo.get({ Id: id });

    $scope.save = function () {
        Todo.update({ id: id } , $scope.item, function () {
            $location.path("/");
        });
    }
}
