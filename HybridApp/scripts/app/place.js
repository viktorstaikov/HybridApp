/**
 * Place view model
 */

var app = app || {};

app.Place = (function () {
    'use strict'
    
    var placeViewModel = (function () {
        
        var placeUid;
        
        var show = function (e) {
            
            placeUid = e.view.params.uid;
            // Get current activity (based on item uid) from Activities model
            var place = app.Places.places.getByUid(placeUid);
            kendo.bind(e.view.element, place, kendo.mobile.ui);
        };
        
        var navigateToReservation = function () {
            app.mobileApp.navigate('views/addReservationView.html?uid=' + placeUid);
        }
        
        return {
            show: show,
            navigateToReservation: navigateToReservation
        };
        
    }());
    
    return placeViewModel;
    
}());
