mainApp.factory("restaurantsFactories", function($http){
	
	var BASE_URL = '/api/v1/restaurants';
    var dataFactory = {};
	
    dataFactory.getRestaurants = function(){
        return $http.get(BASE_URL);
    };
    
    dataFactory.getRestaurant = function(id){
        return $http.get(BASE_URL + '/' + id);
    };
    
    return dataFactory;
});