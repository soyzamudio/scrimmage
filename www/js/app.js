// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var handleOpenURL = function(url) {
  window.localStorage.setItem("external_load", url);
};

angular.module('scrimmagr', ['ionic', 'ui.router','ngCordova', 'angularMoment', 'ngLodash', 'firebase'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  openFB.init({appId: '727860223998157'});
  $urlRouterProvider.otherwise('login');

  $stateProvider
  .state('root', { url: '', controller: 'RootCtrl', data: { authenticate: false }})
  .state('login', { url: '/login', templateUrl: 'templates/login/login.html', controller: 'LoginCtrl', data: { authenticate: false }})

  .state('settings', { url: '/settings', templateUrl: 'templates/settings/settings.html', abstract: true})
  .state('settings.account', { url: '/account', templateUrl: 'templates/settings/settings-account.html', controller: 'SettingsAccountCtrl'})
  .state('settings.edit', { url: '/edit', templateUrl: 'templates/settings/settings-edit.html', controller: 'SettingsEditCtrl'})

  .state('games', { url: '/games', templateUrl: 'templates/games/games.html', abstract: true})
  .state('games.create', { url: '/create', templateUrl: 'templates/games/games-create.html', controller: 'GamesCreateCtrl'})
  .state('games.list', { url: '/list', templateUrl: 'templates/games/games-list.html', controller: 'GamesListCtrl'})
  .state('games.show', { url: '/{gameId}', templateUrl: 'templates/games/games-show.html', controller: 'GamesShowCtrl'})

  .state('users', { url: '/users/', templateUrl: 'templates/users/users.html', abstract: true})
  .state('users.ranking', {url: '/ranking', templateUrl: 'templates/users/users-ranking.html', controller: 'UsersRankingCtrl'})
  .state('users.show', {url: '/{userId}', templateUrl: 'templates/users/users-show.html', controller: 'UsersShowCtrl'});

}])
.run(['$ionicPlatform', '$rootScope', '$state', '$cordovaGeolocation', '$window', '$firebaseAuth',
function($ionicPlatform, $rootScope, $state, $cordovaGeolocation, $window, $firebaseAuth) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.overlaysWebView(true);
      StatusBar.style(1) ;
    }
  });

  $rootScope.ref = new Firebase("https://glaring-torch-7897.firebaseio.com");
  $rootScope.auth = $firebaseAuth($rootScope.ref);
  if (!$rootScope.auth.$getAuth()) {
    $state.transitionTo("login");
    event.preventDefault();
  }

  if ($window.localStorage.external_load) {
    var params = $window.localStorage.external_load.split('//')[1].split('?');
    $window.localStorage.removeItem('external_load');
    var url = {base: params[0], param: params[1]};
    if (url.base === 'users') {
      $state.go('users.show', {userId: url.param});
    } else if (url.base === 'games') {
      $state.go('games.show', {gameId: url.param});
    } else {
      $state.go('games.list');
    }
  }
}])
.controller('RootCtrl', ['$state', function($state) {
    $state.go('login');
}]);
