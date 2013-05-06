
var CreateCtrl = function ($scope, $location, Todo) {

    $scope.action = "Add";

    $scope.save = function () {
        Todo.save($scope.item, function () {
            $location.path("/");
        });
    }
}