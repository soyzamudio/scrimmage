angular.module('scrimmagr')
.controller('GamesCreateCtrl', ['$rootScope', '$scope', '$state', '$ionicPlatform', '$ionicHistory', '$cordovaGeolocation', '$http',
function($rootScope, $scope, $state, $ionicPlatform, $ionicHistory, $cordovaGeolocation, $http) {
  $scope.search = {};
  $scope.user = Parse.User.current().attributes;
  $scope.venues = [];
  $scope.selectedLocation = {};

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.selectVenue = function(venue) {
    $scope.selectedLocation = venue;
    $scope.search.venue = $scope.selectedLocation.name;
  };

  $scope.submit = function() {
    var point = new Parse.GeoPoint({latitude: $scope.selectedLocation.location.lat, longitude: $scope.selectedLocation.location.lng});
    var Game = Parse.Object.extend('game');
    var game = new Game();
    game.set('nameLocation', $scope.selectedLocation.name);
    game.set('geoLocation', point);
    game.set('addressLocation', $scope.selectedLocation.formattedAddress);
    game.set('gameDay', new Date());
    game.set('creator', Parse.User.current());
    game.set('attendees', [{"__type":"Pointer","className":"_User","objectId": Parse.User.current().id}]);
    game.save()
    .then(function(game) {
      $state.go('games.list');
    });
  };

  $scope.getDate = function() {
    console.log('getDate()');
  };

  $scope.getTime = function() {
    console.log('getTime()');
  };

  $http.get('https://api.foursquare.com/v2/venues/search?client_id=I5SUCHUXOVNIODJBIDRZKZK0WDOQSCLWTC010EJPLYOEMXCL&client_secret=4SKETCNRUMUHKXEY24VTG20WMQKCFYCEAJBREIQ5IU4KB1K5&v=20130815&ll=37.5483,-121.9886&query=soccer,field')
  .then(function(response) {
    $scope.venues = response.data.response.venues;
  });

  // $ionicPlatform.ready(function() {
  //   console.log('location');
  //   var posOptions = {timeout: 50000, enableHighAccuracy: false};
  //   $cordovaGeolocation
  //   .getCurrentPosition(posOptions)
  //   .then(function (position) {
  //     $rootScope.position.latitude = position.coords.latitude;
  //     $rootScope.position.longitude = position.coords.longitude;
  //     console.log(position);
  //
  //   }, function(err) {
  //     console.log(JSON.stringify(err));
  //   });
  // });

}]);
