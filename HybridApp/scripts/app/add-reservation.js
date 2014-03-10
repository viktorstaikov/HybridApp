/**
 * AddReservation view model
 */

var app = app || {};

app.AddReservation = (function () {
    'use strict'

    var addReservationViewModel = (function () {
        
        var $newStatus;
        var validator;
        var placeUid;
        
        var init = function () {
            
            validator = $('#enterStatus').kendoValidator().data("kendoValidator");
            $newStatus = $('#newStatus');
        };
        
        var show = function (e) {
            
            // Clear field on view show
            placeUid = e.view.params.uid
            
            $newStatus.val('');
            validator.hideMessages();
        };
        
        var saveReservation = function () {
            
            // Validating of the required fields
            if (validator.validate()) {
                
                // Adding new reservation to Reservations model
                var reservations = app.Reservations.reservations;
                var reservation = reservations.add();
                
                reservation.CustomerId = app.Users.currentUser.get('data').Id;
                reservation.PlaceId = app.Places.places.getByUid(placeUid).Id;
                reservation.NumberOfSeats = $('#numberOfSeatsInput').val();
                
                reservations.one('sync', function () {
                    app.mobileApp.navigate('#:back');
                });
                
                reservations.sync();
            }
        };
        
        return {
            init: init,
            show: show,
            me: app.Users.currentUser,
            saveReservation: saveReservation
        };
        
    }());
    
    return addReservationViewModel;
    
}());
