angular.module('scrimmagr')
.controller('GamesShowCtrl', ['$rootScope', '$scope', '$state', '$ionicHistory', '$ionicLoading', '$compile', '$cordovaSocialSharing', 'moment', '$http', 'lodash', '$cordovaProgress', '$firebaseObject',
function($rootScope, $scope, $state, $ionicHistory, $ionicLoading, $compile, $cordovaSocialSharing, moment, $http, lodash, $cordovaProgress, $firebaseObject) {
  $scope.temperature = null;
  $scope.notAttending = false;

  var ref = new Firebase("https://glaring-torch-7897.firebaseio.com/games/" + $state.params.gameId);
  var game = $firebaseObject(ref);
  game.$loaded(function(game) {
    $scope.game = game;
    drawMap($scope.game);
    // getWeather($scope.game);
    for (var n in $scope.game.attendees) {
      if (lodash.isMatch($scope.game.attendees[n], { 'email': $rootScope.auth.$getAuth().facebook.email }) === false) {
        $scope.notAttending = true;
        console.log('true');
      } else {
        $scope.notAttending = false;
        console.log('false');
      }
    }
  });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.share = function() {
    var message = "Let's play on " + moment.unix($scope.game.day).format('dddd') + " @ " + $scope.game.name + ", Check in at scrimmagr://games?" + $scope.game.$id + " #scrimmagr";
    $cordovaSocialSharing
    .share(message, "It's game time!")
    .then(function(result) {});
  };

  //
  // $scope.attend = function() {
  //   var uid = $rootScope.auth.$getAuth().uid;
  //   var userRef = new Firebase("https://glaring-torch-7897.firebaseio.com/users/" + uid);
  //   userRef.on("value", function(user) {
  //     $scope.game.attendees.push(user.val());
  //     delete $scope.game.attendees[0].$$hashKey;
  //     console.log('attendees...', $scope.game.attendees);
  //     ref.update({
  //       attendees: $scope.game.attendees
  //     });
  //     $scope.notAttending = false;
  //     $scope.$apply();
  //   });
  // };
  //
  function getWeather(game) {
    var day = moment(game.day).format('MMDD');
    $http.get('http://api.wunderground.com/api/f072e1fa016ca1ac/planner_' + day + day + '/q/CA/San_Francisco.json')
    .then(function(response) {
      $scope.temperature = response.data.trip;
    });
  }

  function drawMap(game) {
    var myLatlng = new google.maps.LatLng(game.geopoint.lat, game.geopoint.lng);

    var mapOptions = {
      disableDefaultUI: true,
      center:           myLatlng,
      zoom:             15,
      mapTypeId:        google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: game.name
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
}]);
