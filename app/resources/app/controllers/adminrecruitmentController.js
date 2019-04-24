fijiApp.controller('adminrecruitmentController', function($scope, $http) {
    $scope.recruitment = {};
    $http.get('/application')
      .then(function(result) {
    $scope.recruitment = result.data;
    });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/application?id=' + id)
      .then(function(res) {
        window.location.reload();
      });
    };
});