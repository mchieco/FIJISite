fijiApp.controller('adminrecruitmentController', function($scope, $http) {
    $scope.recruitment = {};
    $http.get('/application')
      .then(function(result) {
    $scope.recruitment = result.data;
    });
});