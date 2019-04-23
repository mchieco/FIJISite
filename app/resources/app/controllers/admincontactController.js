fijiApp.controller('admincontactController', function($scope, $http) {
    $scope.contacts = {};
    $http.get('/contactus')
      .then(function(result) {
      $scope.contacts = result.data;
    });
});