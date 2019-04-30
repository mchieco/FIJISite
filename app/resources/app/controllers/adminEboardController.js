fijiApp.controller('adminEboardController', function($scope, $http) {
    $scope.events = {};
    $http.get('/eboardadmins')
      .then(function(result) {
        $scope.admins = result.data.map(admin=>{
            admin.updatedAt = new Date(admin.updatedAt).toDateString()
            admin.createdAt = new Date(admin.createdAt).toDateString()
            return admin;
        });
        console.log($scope.admins);
    });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/eboardadmins?id=' + id)
      .then(function(res) {
          window.location.reload();
      });
    };
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/event?id=' + id, data);
    };
});