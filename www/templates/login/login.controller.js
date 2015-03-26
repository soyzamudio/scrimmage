angular.module('scrimmagr')
.controller('LoginCtrl', ['$scope', '$state', '$cordovaProgress', function($scope, $state, $cordovaProgress) {
  $scope.fbLogin = function() {
    openFB.login(
      function(response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded');
          getInfo();
        } else {
          alert('Facebook login failed');
        }
      },
      {scope: 'public_profile,email,publish_actions,user_friends'});
    };

  function getInfo() {
    openFB.api({
        path: '/me',
        params: {fields: 'id,name,email'},
        success: function(user) {
          $scope.$apply(function() {
            var query = new Parse.Query(Parse.User);
              query.equalTo("username", user.email);  // find all the women
              query.find({
                success: function(results) {
                  Parse.User.logIn(user.email, user.id, {
                    success: function(user) {
                      $cordovaProgress.showDeterminate(false, 2000);
                      $state.go('games.list');
                    }
                  });
                },
                error: function(error) {
                  var newUser = new Parse.User();
                  newUser.set('email', user.email);
                  newUser.set('username', user.email);
                  newUser.set('password', user.id);
                  newUser.set('name', user.name);
                  newUser.set('facebook', user.id);
                  newUser.set('profilePicture', 'https://graph.facebook.com/' + user.id + '/picture?type=large');
                  newUser.set('gPoints', 0);
                  console.log('user', newUser);
                  newUser.signUp(null, {
                    success: function(user) {
                      $cordovaProgress.showDeterminate(false, 3000);
                      $state.go('games.list');
                      console.log('Success!');
                    },
                    error: function(user, error) {
                      alert("Error: " + error.code + " " + error.message);
                    }
                  });
                }
              });
          });
        },
        error: function(error) {
            alert('Facebook error: ' + error.error_description);
        }
    });
  }
}]);
