var fijiApp = angular.module("fijiApp", ["ngRoute"]);

fijiApp.config(function ($routeProvider) {
    $routeProvider
        .when("/application",  { controller: "recController"})
        .when("/contactus",  { controller: "contactController"})
        .when("/eboardadmin", { controller: "adminController"})
        .otherwise({ redirectTo: "/404_page" });
});
