var MyApp = angular.module('MyApp', ['ngResource', 'ngMessages', 'ngRoute', 'ngAnimate', 'mgcrea.ngStrap']);

  MyApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl',
        title: 'Home - ShowTrackr'
      })
      .when('/shows/:id', {
        templateUrl: 'views/detail.html',
        controller: 'DetailCtrl',
        title: 'Shows details'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
		title: 'Login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
		title: 'SignUp'
      })
      .when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddCtrl',
		title: 'Add '
      })
	  .when('/user/:id', {
        templateUrl: 'views/profile.html',
        controller: 'UserProfileCtrl',
		title: 'My profile'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  MyApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope, $q, $window, $location) {
      return {
        request: function(config) {
          if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          }
          return config;
        },
        responseError: function(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      }
    });
  });
// change Page Title based on the routers
MyApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
