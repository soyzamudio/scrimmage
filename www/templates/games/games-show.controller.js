angular.module('scrimmagr')
.controller('GamesShowCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', '$compile', '$cordovaSocialSharing', 'moment',
function($scope, $state, $ionicHistory, $ionicLoading, $compile, $cordovaSocialSharing, moment) {

  var Games = Parse.Object.extend("game");
  var query = new Parse.Query(Games);
  query.equalTo('objectId', $state.params.gameId);
  query.include("attendees.pointer");
  query.first({
    success: function(game) {
      $scope.game = game;
      drawMap($scope.game);
    }
  });

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };

  $scope.share = function() {
    var message = "Let's play on " + moment($scope.game.attributes.date).format('dddd') + " @ " + $scope.game.attributes.nameLocation + ", Check in at scrimmagr://games?" + $scope.game.id + " #scrimmagr";
    $cordovaSocialSharing
    .share(message, "It's game time!")
    .then(function(result) {
      console.log(result);
    });
  };

  $scope.goToUser = function(userId) {
    $state.go('users.show', {userId: userId});
  };

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
