mainApp.controller("restaurantsListCtrl", function($scope, restaurantsFactories)
{
    $scope.restaurants;
    
    restaurantsFactories.getRestaurants()
	.success(function(data){
		var restaurants = data.content;
		$scope.restaurants = restaurants;
	})
	.error(function(error){
		$scope.error = {simple : "Problemi nel caricamento dati", detailed : JSON.stringify(error)};
    })
});

mainApp.controller("restaurantsDetailCtrl", function($scope, restaurantsFactories, $routeParams)
{
	$scope.restaurant;
	
	restaurantsFactories.getRestaurant($routeParams.id)
	.success(function(data){
		var restaurant = data.content;
		$scope.restaurant = restaurant;
	})
	.error(function(error){
		$scope.error = {simple : "Problemi nel caricamento dati", detailed : JSON.stringify(error)};
    })
});