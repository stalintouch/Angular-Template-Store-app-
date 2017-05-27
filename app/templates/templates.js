angular.module('templateStore.templates', ['ngRoute'])
.config(['$routeProvider', function($routeProvider){
  $routeProvider
  .when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'templatesCtrl'
  })
  .when('/templates/:templateId', {
    templateUrl: 'templates/template-details.html',
    controller: 'templateDetailsCtrl'
  })
}])
.controller('templatesCtrl', ['$scope','$http', function($scope, $http){
  $http.get('json/templates.json').success(function(data){
    $scope.templates = data
  })
}])
.controller('templateDetailsCtrl', ['$scope','$http','$routeParams','$filter', function($scope, $http, $routeParams, $filter){
  $http.get('json/templates.json').success(function(data){
    $scope.templateId = $routeParams.templateId;
    $scope.template = $filter('filter')(data,function(d){
      return d.id == $scope.templateId;
    })[0];
    $scope.mainImage = $scope.template.images[0].name
  });
  $scope.setImage = function(image){
    $scope.mainImage = image.name
  }
}]);