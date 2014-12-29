'use strict';
//,'angular-loading-bar', 'ui.bootstrap','infinite-scroll','app.directives','app.ui.ctrls','app.ui.services','app.user','ModelUser','ModelMessage','app.messages'
angular.module('app', ['ngRoute','ngSanitize','ui.bootstrap','app.controllers','app.ui.services','ModelMain','infinite-scroll','app.post']).config([
  '$routeProvider', function($routeProvider) {
    // return $routeProvider.when('/', {
    //   redirectTo: '/dashboard'
    // }).when('/', {
    //   templateUrl: 'scripts/dashboard/dash.html',
    //   controller: 'DashboardCtrl'
    // }).when('/dashboard', {
    //   templateUrl: 'scripts/dashboard/dash.html',
    //   // controller: 'DashboardCtrl'
    // }).when('/_=_', {
    //   templateUrl: 'views/dashboard/dash.html',
    //   controller: 'DashboardCtrl'
    // }).when('/test', {
    //   templateUrl: 'views/test.html',
    //   controller:'UserCtrl'
    // }).when('/user/profile', {
    //   templateUrl: 'views/user/profile.html',
    //   controller:'UserCtrl'
    // }).when('/user/favorites', {
    //   templateUrl: 'scripts/adds/favorites.html',
    //   controller:'AdsCtrl'
    // }).when('/user/settings', {
    //   templateUrl: 'views/user/settings.html',
    //   controller:'UserCtrl'
    // }).when('/user/password', {
    //   templateUrl: 'views/user/pass.html',
    //   controller:'UserCtrl'
    // }).when('/user/type', {
    //   templateUrl: 'views/user/choose.html',
    // }).when('/admin/messages', {
    //   templateUrl: 'scripts/admin/messages.html',
    //   controller: 'AdminMessagesCtrl'
    // }).otherwise({
    //   redirectTo: '/404'
    // });
  }
]);
