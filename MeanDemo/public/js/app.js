var myApp=angular.module("myApp",["ngRoute","studentCtrls"])

myApp.config(function($routeProvider) {
    $routeProvider.when('/',{
        templateUrl:"./login.html",
        controller:"studentCtrl"
    }).when('/login',{
        templateUrl:"./login.html",
        controller:"studentCtrl"
    }).when('/register',{
        templateUrl:"./register.html",
        controller:"studentCtrl"
    }).when('/success',{
        templateUrl:"./success.html",
        controller:"studentCtrl"
    }).otherwise({
        redirectTo:"/"
    })
})