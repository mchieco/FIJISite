var fijiApp = angular.module("fijiApp", ["ngRoute", "xeditable"]);
fijiApp.run(['editableOptions', function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
  }]);
fijiApp.config(function ($routeProvider) {
    $routeProvider
        .when("/events/allevents",  
        { 
            templateUrl: 'app/partials/eventalladmin.html',
            controller: "admingeteventController"
        })
        .when("/events/createvents",  
        { 
            templateUrl: 'app/partials/eventcreateadmin.html',
            controller: "admincreateeventController"
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
        .when("/eboardadmins",  
        { 
            templateUrl: 'app/partials/eboardAdmins.html',
            controller: "adminEboardController"
        })
        .when("/",  { redirectTo: "/events/allevents" })
        .otherwise({ redirectTo: "/404_page" });
});
