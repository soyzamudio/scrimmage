// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('scrimmagr', ['ionic', 'ui.router','ngCordova'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('root', { url: '', controller: 'RootCtrl', data: { authenticate: false }})
  .state('login', { url: '/login', templateUrl: '../templates/login/login.html', controller: 'LoginCtrl', data: { authenticate: false }})

  .state('settings', { url: '/settings', templateUrl: '../templates/settings/settings.html', abstract: true, data: { authenticate: true }})
  .state('settings.account', { url: '/account', templateUrl: '../templates/settings/settings-account.html', controller: 'SettingsAccountCtrl'})
  .state('settings.edit', { url: '/edit', templateUrl: '../templates/settings/settings-edit.html', controller: 'SettingsEditCtrl'})

  .state('games', { url: '/games', templateUrl: '../templates/games/games.html', abstract: true, data: { authenticate: true }})
  .state('games.create', { url: '/create', templateUrl: '../templates/games/games-create.html', controller: 'GamesCreateCtrl'})
  .state('games.list', { url: '/list', templateUrl: '../templates/games/games-list.html', controller: 'GamesListCtrl'})
  .state('games.show', { url: '/show/{gameId}', templateUrl: '../templates/games/games-show.html', controller: 'GamesShowCtrl'});

  $urlRouterProvider.otherwise('/login');
}])
.run(['$ionicPlatform', '$rootScope', '$state', '$cordovaStatusbar', function($ionicPlatform, $rootScope, $state, $cordovaStatusbar) {
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
  });

  // UI Router Authentication Check
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
