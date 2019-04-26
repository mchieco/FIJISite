fijiApp.controller('admincreateeventController', function ($scope, $http) {
    $scope.submitshortForm = function () {
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.name,
                startDate: $scope.date + $scope.time,
                endDate: $scope.date + $scope.time
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
                clearField();
            });
    };
    $scope.submitlongForm = function () {
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.fname,
                startDate: $scope.lname,
                endDate: $scope.email
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
                clearField();
            });
    };
});
function clearField() {
    document.getElementById("recForm").reset();
}