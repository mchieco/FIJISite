fijiApp.controller('adminrecruitmentController', function($scope, $http) {
    $scope.recruitment = {};
    $http.get('/application')
      .then(function(result) {
    $scope.recruitment = result.data;
    console.log($scope.recruitment);
    });

    $scope.downloadXLS = function() {
      var fields = $scope.recruitment.map((object)=>{
        return {"First Name":object.firstName, "Last Name":object.lastName, "Email":object.email, "Phone Number":object.phoneNumber} //etc etc..
    })
      var ws = XLSX.utils.json_to_sheet(fields);
      var wb = XLSX.utils.book_new();
      var wscols = [
        {wpx:100},
        {wpx:100},
        {wpx:200},
        {wpx:100}
    ];
      ws['!cols'] = wscols;
      XLSX.utils.book_append_sheet(wb, ws, "Recruitment");
      XLSX.writeFile(wb, "fijiRecruitment.xlsx");
    }
    $scope.remove = function(id,reload=true) {
      return new Promise((resolve, reject) => {
        console.log(id);
        $http.delete('/application?id=' + id)
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
      if(!confirm("Are you sure you want to remove all the data?\n\nThis cannot be undone.")){
        return;
      }
      return new Promise((resolve, reject) => {
        $http.delete(`/application?all=${encodeURI(true)}`)
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
      return $http.put('/application?id=' + id, data);
    };
});