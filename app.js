(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('MenuItemsSearchController', MenuItemsSearchController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

MenuItemsSearchController.$inject = ['MenuSearchService'];
function MenuItemsSearchController(MenuSearchService) {
	console.log('MenuItemsSearchController()');
	var menu = this;

	menu.searchTerm = "";
	
	// var promise = MenuSearchService.getMenuCategories();

	// promise.then(function (response) {
	// 	menu.categories = response.data;
	// })
	// .catch(function (error) {
	// 	console.log("Something went terribly wrong.");
	// });

	menu.logMenuItems = function (shortName) {
		console.log('MenuItemsSearchController.logMenuItems()');
		var promise = MenuSearchService.getMatchedMenuItems(shortName);

	};
}


// MenuSearch Service 
MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
	console.log('MenuSearchService()');
	var service = this;
	var matched_item_list = [];

	//Service method
	service.getMatchedMenuItems = function(searchTerm) {
		// retrieve the menu items via $http
		console.log('MenuSearchService.getMatchedMenuItems(' + searchTerm + ')');
		var response = $http({
				method: "GET",
				url: (ApiBasePath + "/menu_items.json")
			})
			.then(	function( response ) { 
						console.log( 'all is good' );
						//console.log( response.data.menu_items );
						//console.log( response.data.menu_items.length);
						for (var i = 0; i < response.data.menu_items.length; i++) {
						 	var description = response.data.menu_items[i].description;
						 	//console.log(description);
						 	if (description.toLowerCase().indexOf(searchTerm) !== -1) {
						 		// A Match!, so add it to the matched list
						 		//console.log('A match!');
						 		matched_item_list.push(response.data.menu_items[i]);
							} else {
								//console.log('No match');
							}
    					}
    					return matched_item_list;
					},
					function( error ) {
						console.log( error );
					}
			);
	};
	// Service method - getMenuItems
	// service.getMenuItems = function () {
	// 	var response = $http({
	// 		method: "GET",
	// 		url: (ApiBasePath + "/menu_items.json")
	// 	});
	// 	return response;
	// };

	// service.getMenuForCategory = function (shortName) {
	// 	var response = $http({
	// 		method: "GET",
	// 		url: (ApiBasePath + "/menu_items.json"),
	// 		params: {
	// 			category: shortName
	// 		}
	// 	});

	// 	return response;
	// };

}

})();