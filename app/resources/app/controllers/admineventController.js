fijiApp.controller('admineventController', function($scope, $http) {
    $scope.events = {};
    $http.get('/event')
      .then(function(result) {
        $scope.events = result.data;
    });
});