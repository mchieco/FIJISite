fijiApp.controller('contactController', function($scope, $http) {
    $scope.user = {};
      $scope.submitForm = function() {
      $http({
        method  : 'POST',
        url     : '/contactus',
        data    : {
          firstName : $scope.fname,
          lastName : $scope.lname,
          email : $scope.email,
          message : $scope.subject,
        },
        headers : { 'Content-Type': 'application/json' } 
       })
        .success(function(data) {
          clearField();
        });
      };
  });
  function clearField() {
    document.getElementById("contactForm").reset();
}