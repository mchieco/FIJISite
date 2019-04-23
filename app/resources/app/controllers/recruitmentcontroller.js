fijiApp.controller('recController', function($scope, $http) {
    $scope.user = {};
      $scope.submitForm = function() {
      $http({
        method  : 'POST',
        url     : '/application',
        data    : {
          firstName : $scope.fname,
          lastName : $scope.lname,
          email : $scope.email,
          phoneNumber : $scope.phone,
        },
        headers : { 'Content-Type': 'application/json' } 
       })
        .success(function(data) {
          clearField();
        });
      };
  });
  function clearField() {
    document.getElementById("recForm").reset();
}
