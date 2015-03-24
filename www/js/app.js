// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('scrimmagr', ['ionic', 'ui.router','ngCordova', "LiveSearch"])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('login');

  $stateProvider
  .state('root', { url: '', controller: 'RootCtrl', data: { authenticate: false }})
  .state('login', { url: '/login', templateUrl: 'templates/login/login.html', controller: 'LoginCtrl', data: { authenticate: false }})

  .state('settings', { url: '/settings', templateUrl: 'templates/settings/settings.html', abstract: true, data: { authenticate: true }})
  .state('settings.account', { url: '/account', templateUrl: 'templates/settings/settings-account.html', controller: 'SettingsAccountCtrl'})
  .state('settings.edit', { url: '/edit', templateUrl: 'templates/settings/settings-edit.html', controller: 'SettingsEditCtrl'})

  .state('games', { url: '/games', templateUrl: 'templates/games/games.html', abstract: true, data: { authenticate: true }})
  .state('games.create', { url: '/create', templateUrl: 'templates/games/games-create.html', controller: 'GamesCreateCtrl'})
  .state('games.list', { url: '/list', templateUrl: 'templates/games/games-list.html', controller: 'GamesListCtrl'})
  .state('games.show', { url: '/{gameId}', templateUrl: 'templates/games/games-show.html', controller: 'GamesShowCtrl'})

  .state('users', { url: '/users/', templateUrl: 'templates/users/users.html', abstract: true, data: { authenticate: true }})
  .state('users.ranking', {url: '/ranking', templateUrl: 'templates/users/users-ranking.html', controller: 'UsersRankingCtrl'})
  .state('users.show', {url: '/{userId}', templateUrl: 'templates/users/users-show.html', controller: 'UsersShowCtrl'});

}])
.run(['$ionicPlatform', '$rootScope', '$state', '$cordovaStatusbar', '$cordovaGeolocation',
function($ionicPlatform, $rootScope, $state, $cordovaStatusbar, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusbar.style(1);
    }

    $rootScope.position = {};

    $ionicPlatform.ready(function() {
      var posOptions = {timeout: 10000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        $rootScope.position.latitude = position.coords.latitude;
        $rootScope.position.longitude = position.coords.longitude;
      }, function(err) {
        console.log(JSON.stringify(err));
      });
    });
  });

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate && !Parse.User.current()) {
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault();
    }
  });
}])
.controller('RootCtrl', ['$state', function($state) {
    $state.go('games.list');
}]);
