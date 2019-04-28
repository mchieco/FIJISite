fijiApp.controller('admincreateeventController', function ($scope, $http) {
    $scope.submitshortForm = function () {
        console.log($scope.date);
        let year = $scope.date.getFullYear();
        let month = $scope.date.getMonth();
        let day = $scope.date.getDate();
        console.log($scope.time);
        let hour = $scope.time.getHours();
        console.log(hour)
        let minute = $scope.time.getMinutes();
        let date = new Date(year, month, day, hour, minute, 0, 0);
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.name,
                startDate: date,
                endDate: date
            },
            headers: { 'Content-Type': 'application/json' }
        })
            .then(function (data) {
                clearField1();
            });
    };
    $scope.submitlongForm = function () {
        let year1 = $scope.date1.getFullYear();
        let month1 = $scope.date1.getMonth();
        let day1 = $scope.date1.getDate();
        let year2 = $scope.date2.getFullYear();
        let month2 = $scope.date2.getMonth();
        let day2 = $scope.date2.getDate();
        let date1 = new Date(year1, month1, day1, 0, 0, 0, 0);
        let date2 = new Date(year2, month2, day2, 0, 0, 0, 0);
        $http({
            method: 'POST',
            url: '/event',
            data: {
                name: $scope.name,
                startDate: date1,
                endDate: date2
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