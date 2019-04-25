fijiApp.controller('adminrecruitmentController', function($scope, $http) {
    $scope.recruitment = {};
    $http.get('/application')
      .then(function(result) {
    $scope.recruitment = result.data;
    console.log($scope.recruitment);
    });
    $scope.remove = function(id,reload=true) {
      console.log(id);
      $http.delete('/application?id=' + id)
      .then(function(res) {
        if(reload){
          window.location.reload();
        }
      });
    };
    /**
     * @typedef {Object} recruitment
     * @property {String} _id
     * @property {String} firstName
     * @property {String} lastName
     * @property {String} email
     * @property {String} phone
     * @param {Array<recruitment>} data 
     */
    $scope.deleteAll = function(data){
      data.forEach(object=>{
        $scope.remove(object._id,false);
      })
    };
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/application?id=' + id, data);
    };
});