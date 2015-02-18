angular.module('MyApp')
  .controller('UserProfileCtrl', function($scope, $rootScope, $routeParams, User, Subscription) {
      User.get({_id: $routeParams.id }, function(profileInfo) {
        console.log("user details: "+profileInfo.user);
        console.log("show details: "+profileInfo.shows);
        $scope.user = profileInfo.user;
        $scope.showList = profileInfo.shows
      })
});
