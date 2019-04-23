fijiApp.controller('adminController', function($scope, $http) {
    $scope.events = {};
    $scope.contacts = {};
    $scope.recruitment = {};
    $http.get('/event')
      .then(function(result) {
        $scope.events = result.data;
    });
    $http.get('/contactus')
      .then(function(result) {
      $scope.contacts = result.data;
    });
    $http.get('/application')
      .then(function(result) {
    $scope.recruitment = result.data;
    });
});