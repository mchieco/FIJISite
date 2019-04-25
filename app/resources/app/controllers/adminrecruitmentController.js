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
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/application?id=' + id, data);
    };
});