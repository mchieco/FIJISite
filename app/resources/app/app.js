var fijiApp = angular.module("fijiApp", ["ngRoute"]);

fijiApp.config(function ($routeProvider) {
    $routeProvider
        .when("/events",  
        { 
            templateUrl: 'app/partials/eventadmin.html',
            controller: "admineventController"
        })
        .when("/contactus",  
        { 
            templateUrl: 'app/partials/contactadmin.html',
            controller: "admincontactController"
        })
        .when("/recruitment",  
        { 
            templateUrl: 'app/partials/recruitmentadmin.html',
            controller: "adminrecruitmentController"
        })
        .when("/",  { redirectTo: "/events" })
        .otherwise({ redirectTo: "/404_page" });
});
