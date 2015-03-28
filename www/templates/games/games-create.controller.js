angular.module('scrimmagr')
.controller('GamesCreateCtrl', ['$rootScope', '$scope', '$state', '$ionicPlatform', '$ionicHistory', '$cordovaGeolocation', '$http', '$cordovaDatePicker', 'moment', '$cordovaProgress', '$firebaseObject',
function($rootScope, $scope, $state, $ionicPlatform, $ionicHistory, $cordovaGeolocation, $http, $cordovaDatePicker, moment, $cordovaProgress, $firebaseObject) {
  var ref = new Firebase("https://glaring-torch-7897.firebaseio.com");
  var gameRef = ref.child("games");
  $scope.search = {};
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
    $scope.hide = false;
  };

  $scope.submit = function() {
    var uid = $rootScope.auth.$getAuth().uid;
    var ref = new Firebase("https://glaring-torch-7897.firebaseio.com/users/" + uid);
    ref.on("value", function(user) {
      $scope.currentUser = user.val();
      gameRef.push({
        name: $scope.selectedLocation.name,
        geopoint: {lat: $scope.selectedLocation.location.lat, lng: $scope.selectedLocation.location.lng},
        address: $scope.selectedLocation.location.formattedAddress,
        day: moment($scope.selectedTime).unix(),
        distance: $scope.selectedLocation.location.distance,
        creator: $rootScope.auth.$getAuth(),
        attendees: [$scope.currentUser]
      });
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
