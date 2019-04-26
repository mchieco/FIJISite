fijiApp.controller('admincreateeventController', function ($scope, $http) {
    $scope.submitshortForm = function () {
        console.log($scope.date);
        console.log($scope.time);
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.name,
                startDate: $scope.date,
                endDate: $scope.time
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
                clearField1();
            });
    };
    $scope.submitlongForm = function () {
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.name,
                startDate: $scope.date1,
                endDate: $scope.date2
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
                clearField2();
            });
    };
});
function clearField1() {
    document.getElementById("shortEventForm").reset();
}
function clearField2() {
    document.getElementById("longEventForm").reset();
}