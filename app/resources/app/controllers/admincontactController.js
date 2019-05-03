fijiApp.controller('admincontactController', function($scope, $http) {
    $scope.contacts = {};
    $http.get('/contactus')
      .then(function(result) {
      $scope.contacts = result.data;
    });
    $scope.remove = function(id) {
      console.log(id);
      $http.delete('/contactus?id=' + id)
      .then(function(res) {
        window.location.reload();
      });
    };
        /**
     * @typedef {Object} recruitment
     * @property {String} _id
     * @property {String} firstName
     * @property {String} lastName
     * @property {String} email
     * @property {String} message
     * @param {Array<contact>} data 
     */
    $scope.deleteAll = function(data){
      if(!confirm("Are you sure you want to remove all the data?\n\nThis cannot be undone.")){
        return;
      }
      return new Promise((resolve, reject) => {
        $http.delete(`/contactus?all=${encodeURI(true)}`)
        .then(function(res) {
          resolve();
          if(reload){
            window.location.reload();
          }
        })
        .catch(err=>{
          reject(err);
        })
      })
    };
    $scope.save = function(data, id) {
      //$scope.user not updated yet
      angular.extend(data, {id: id});
      return $http.put('/contactus?id=' + id, data);
    };
});