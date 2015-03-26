angular.module('scrimmagr')
.controller('GamesShowCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', '$compile', '$cordovaSocialSharing', 'moment', '$http',
function($scope, $state, $ionicHistory, $ionicLoading, $compile, $cordovaSocialSharing, moment, $http) {

  var temperature = null;

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.equalTo('objectId', $state.params.gameId);
  query.include("attendees.pointer");
  query.first({
    success: function(game) {
      $scope.game = game;
      drawMap($scope.game);
      getWeather($scope.game);
    }
  });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.share = function() {
    var message = "Let's play on " + moment($scope.game.attributes.date).format('dddd') + " @ " + $scope.game.attributes.nameLocation + ", Check in at scrimmagr://games?" + $scope.game.id + " #scrimmagr";
    $cordovaSocialSharing
    .share(message, "It's game time!")
    .then(function(result) {});
  };

  $scope.goToUser = function(userId) {
    $state.go('users.show', {userId: userId});
  };

  function getWeather(game) {
    var day = moment(game.attributes.gameDay).format('MMDD');
    $http.get('http://api.wunderground.com/api/f072e1fa016ca1ac/planner_' + day + day + '/q/CA/San_Francisco.json')
    .then(function(response) {
      $scope.temperature = response.data.trip;
      console.log(response.data.trip);
    });
  }

  function drawMap(game) {
    var myLatlng = new google.maps.LatLng(game.attributes.geoLocation.latitude, game.attributes.geoLocation.longitude);

    var mapOptions = {
      disableDefaultUI: true,
      center:           myLatlng,
      zoom:             12,
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
      title: game.attributes.nameLocation
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
}]);
