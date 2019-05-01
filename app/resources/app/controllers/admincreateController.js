fijiApp.controller('admincreateController', function($scope, $http) {
  $scope.submitcreateForm = function () {
    $http({
      method: 'POST',
      url: '/auth',
      data: {
          username: $scope.name,
          password: $scope.pwd,
      },
      headers: { 'Content-Type': 'application/json' }
  })
      .then(function (data) {
          clearField();
      });
}
});

function clearField() {
  document.getElementById("createForm").reset();
}