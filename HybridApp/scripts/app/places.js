/**
 * Places view model
 */

var app = app || {};

app.Places = (function () {
    'use strict'
    
    // Places model
    var placesModel = (function () {
        
        var placesModel = {
            
            id: 'Id',
            fields: {
                Name: {
                    field: 'Name',
                    defaultValue: '<Name>'
                },
                ProfilePicture: {
                    fields: 'ProfilePicture',
                    defaultValue: null
                },
                Address: {
                    fields: 'Address',
                    defaultValue: '<Address>'
                }
            },
            PictureUrl: function () {
                
                return app.helper.resolvePictureUrl(this.get('ProfilePicture'));
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');
                
                return currentUserId === userId;
            }
        };
        
        // Places data source. The Everlive dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations. 
        var placesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: placesModel
            },
            transport: {
                // Required by Everlive
                typeName: 'Places'
            },
            change: function (e) {
                
                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });
        
        return {
            places: placesDataSource
        };
        
    }());

    // Places view model
    var placesViewModel = (function () {

        var init = function () {
            var filters = [];
            var favourites = app.Users.currentUser.data.Favourites || [];
            favourites.forEach(function(favourite){
                filters.push({
                    field:'Id',
                    operator: 'eq',
                    value: favourite
                });
            });
            
            placesModel.places.filter({
                logic: 'or',
                filters: filters 
            });
            placesModel.places.read();
        };
        
        // Navigate to placeView When some place is selected
        var placeSelected = function (e) {
            
            app.mobileApp.navigate('views/placeView.html?uid=' + e.data.uid);
        };
        
        // Navigate to app home
        var navigateHome = function () {
            
            app.mobileApp.navigate('#welcome');
        };
        
        // Logout user
        var logout = function () {
            
            app.helper.logout()
            .then(navigateHome, function (err) {
                
                localStorage.removeItem('cachedCreds')
                
                app.showError(err.message);
                navigateHome();
            });
        };
        
        return {
            places: placesModel.places,
            placeSelected: placeSelected,
            init: init,
            logout: logout
        };
        
    }());
    
    return placesViewModel;
    
}());
