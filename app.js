(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ['MenuSearchService', '$timeout'];
function NarrowItDownController(MenuSearchService, $timeout) {
	var list = this;
	//console.log('NarrowItDownController()');
	

	list.showItems = function () {
		//console.log('NarrowItDownController.showItems()');
		var promise = MenuSearchService.getMatchedMenuItems( list.searchTerm );
		promise.then( 	function (response) {
							console.log('all good');
							console.log(response);
						});
	};
}


// MenuSearch Service 
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
	console.log('MenuSearchService()');
	var service = this;

	//Service method
	service.getMatchedMenuItems = function(searchTerm) {
		// retrieve the menu items via $http
		//console.log('MenuSearchService.getMatchedMenuItems(' + searchTerm + ')');
		return $http({ method: "GET", url: (ApiBasePath + "/menu_items.json")})
			.then (	function( response ) {
				//console.log(response.data['menu_items'].length);
				return response.data['menu_items'].filter(
					function (item) { 
						return item.description.indexOf(searchTerm) !== -1;
					}
				);
			});
	};
}

})();