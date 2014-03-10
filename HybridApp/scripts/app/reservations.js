/**
 * Reservations view model
 */

var app = app || {};

app.Reservations = (function () {
    'use strict'
    
    // Reservations model
    var reservationsModel = (function () {
        
        var reservationsModel = {
            
            id: 'Id',
            fields: {
                Text: {
                    field: 'Text',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                CustomerId: {
                    field: 'CustomerId',
                    defaultValue: null
                },
                PlaceId: {
                    field: 'PlaceId',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {
                
                return app.helper.formatDate(this.get('CreatedAt'));
            },
            User: function () {
                
                var userId = this.get('CustomerId');
                
                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];
                
                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            Place: function () {
                
                var placeId = this.get('PlaceId');
                
                var place = $.grep(app.Places.places, function (e) {
                    return e.Id === placeId;
                })[0];
                
                return place ? {
                    Name: place.Name,
                    PictureUrl: app.helper.resolveProfilePictureUrl(place.ProfilePicture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');
                
                return currentUserId === userId;
            }
        };
        
        // Reservations data source. The Everlive dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations. 
        var reservationsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: reservationsModel
            },
            transport: {
                // Required by Everlive
                typeName: 'Reservations'
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
            reservations: reservationsDataSource
        };
        
    }());

    // Reservations view model
    var reservationsViewModel = (function () {
        
        // Navigate to placeView When some place is selected
        /*var placeSelected = function (e) {
            
            app.mobileApp.navigate('views/activityView.html?uid=' + e.data.uid);
        };*/
        
        // Navigate to app home
        /*var navigateHome = function () {
            
            app.mobileApp.navigate('#welcome');
        };*/
        
        // Logout user
        /*var logout = function () {
            
            app.helper.logout()
            .then(navigateHome, function (err) {
                app.showError(err.message);
                navigateHome();
            });
        };*/
        
        return {
            reservations: reservationsModel.reservations,
            //placeSelected: placeSelected,
            //logout: logout
        };
        
    }());
    
    return reservationsViewModel;
    
}());
