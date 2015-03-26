angular.module('scrimmagr')
.controller('GamesCreateCtrl', ['$rootScope', '$scope', '$state', '$ionicPlatform', '$ionicHistory', '$cordovaGeolocation', '$http', '$cordovaDatePicker', 'moment', '$cordovaProgress',
function($rootScope, $scope, $state, $ionicPlatform, $ionicHistory, $cordovaGeolocation, $http, $cordovaDatePicker, moment, $cordovaProgress) {
  $scope.search = {};
  $scope.user = Parse.User.current().attributes;
  $scope.venues = [];
  $scope.selectedLocation = {};
  $scope.selectedTimeText = 'Select a day a time';
  $scope.hide = true;

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.selectVenue = function(venue) {
    $scope.selectedLocation = venue;
    $scope.search.venue = $scope.selectedLocation.name;
    console.log($scope.selectedLocation);
    $scope.hide = false;
  };

  $scope.submit = function() {
    var point = new Parse.GeoPoint({latitude: $scope.selectedLocation.location.lat, longitude: $scope.selectedLocation.location.lng});
    var Game = Parse.Object.extend('game');
    var game = new Game();
    game.set('nameLocation', $scope.selectedLocation.name);
    game.set('geoLocation', point);
    game.set('addressLocation', $scope.selectedLocation.location.formattedAddress);
    game.set('gameDay', $scope.selectedTime);
    game.set('distanceLocation', $scope.selectedLocation.location.distance);
    game.set('creator', Parse.User.current());
    game.set('attendees', [{"__type":"Pointer","className":"_User","objectId": Parse.User.current().id}]);
    game.save()
    .then(function(game) {
      $cordovaProgress.showAnnular(true, 3000);
      $state.go('games.list');
    });
  };

  $scope.getDate = function() {
    var options = {
      date:              new Date(),
      mode:              'date, time', // or 'time'
      maxDate:           moment().add(90, 'days').toDate(),
      allowOldDates:     true,
      allowFutureDates:  false,
      doneButtonLabel:   'DONE',
      doneButtonColor:   '#000000',
      cancelButtonLabel: 'CANCEL',
      cancelButtonColor: '#000000'
    };

    $cordovaDatePicker.show(options)
    .then(function(date){
      $scope.selectedTime = date;
      $scope.selectedTimeText = moment($scope.selectedTime).format('LLL');
    });
  };

  $rootScope.position = {};

  $ionicPlatform.ready(function() {
    console.log('location');
    var posOptions = {timeout: 50000, enableHighAccuracy: false};
    $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      $rootScope.position.latitude = position.coords.latitude;
      $rootScope.position.longitude = position.coords.longitude;
      getFoursquareData($rootScope.position.latitude, $rootScope.position.longitude);
    }, function(err) {
      console.log(JSON.stringify(err));
    });
  });

  function getFoursquareData(lat, lng) {
    $http.get('https://api.foursquare.com/v2/venues/search?client_id=I5SUCHUXOVNIODJBIDRZKZK0WDOQSCLWTC010EJPLYOEMXCL&client_secret=4SKETCNRUMUHKXEY24VTG20WMQKCFYCEAJBREIQ5IU4KB1K5&v=20130815&ll=' + lat + ',' + lng + '&query=soccer,field')
    .then(function(response) {
      $scope.venues = response.data.response.venues;
    });
  }
}]);
