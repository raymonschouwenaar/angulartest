"use strict";function ContactFormCtrl(a){a.list=[],a.text="hello",a.submit=function(){a.text&&(a.list.push(this.text),a.text="")}}function PropertyFormCtrl(a){a.propertyObject=[],a.propertyItem="",a.submit=function(){a.propertyItem&&(a.propertyObject.push(this.propertyItem),a.propertyItem="")}}function GetCurrentDate(){var a=new Date,b=a.getFullYear(),c=a.getMonth()+1;10>c&&(c="0"+c);var d=a.getDate();$scope.date=b+"-"+c+"-"+d}var ppp=angular.module("ppppropertiesApp",["ngResource","ngCookies","ngSanitize","ngRoute"]);ppp.config(["$routeProvider",function(a){a.when("/",{templateUrl:"home/home.html"}).when("/home",{templateUrl:"home/home.html"}).when("/property",{templateUrl:"property/property.html"}).when("/contact",{templateUrl:"contact/contact.html"}).otherwise({redirectTo:"/"})}]);var ppp=angular.module("ppppropertiesApp");ppp.controller("HomeCtrl",["$scope","$http",function(a,b){a.home=[],b.get("/home/home.json").success(function(b){a.loaded=!0,a.home=b}).error(function(a){console.log(a)})}]);var ppp=angular.module("ppppropertiesApp");ppp.controller("ContactCtrl",["$scope","$http",function(a,b){a.contact=[],b.get("/contact/contact.json").success(function(b){a.loaded=!0,a.contact=b}).error(function(a){console.log(a)})}]);var ppp=angular.module("ppppropertiesApp");ppp.controller("PropertyCtrl",["$scope","$http",function(a,b){a.property=[],b.get("/property/property.json").success(function(b){a.loaded=!0,a.property=b}).error(function(a){console.log(a)})}]);