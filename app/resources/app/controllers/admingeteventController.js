fijiApp.controller('admingeteventController', function($scope, $http) {
    $scope.events = {};
    $http.get('/event')
      .then(function(result) {
        $scope.events = result.data;
    });
});