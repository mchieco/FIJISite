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
    $scope.update = function(id) {
      console.log("coooooool");
      $http({
        method  : 'PUT',
        url     : '/application?id=' + id,
        data    : JSON.stringify({
          firstName : $scope.fname,
          lastName : $scope.lname,
          email : $scope.email,
          phoneNumber : $scope.phone,
        }),
        headers : { 'Content-Type': 'application/json' } 
       })
        .then(function(data) {
            console.log(data);
        })
        .catch(function(error){
          console.log(error);
        })
      };
});