angular.module('MyApp')
  .factory('User', function($resource) {
    return $resource('/api/user/:_id');
  });
