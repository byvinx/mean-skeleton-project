mainApp.config(function($routeProvider)
{
    $routeProvider
    	.when("/restaurants",
    	{
            templateUrl: "/templates/restaurants/restaurants-list.tpl.html",
            controller: "restaurantsListCtrl"
        })
        .when("/restaurants/:id",
        {
            templateUrl: "/templates/restaurants/restaurants-detail.tpl.html",
            controller: "restaurantsDetailCtrl"
        })
        .otherwise({redirectTo: "/restaurants"});
});