/*
 * This file, trinity-directions.js, uses the jQuery UI Google Map 3.0-rc
 * plug-in, but is NOT associated with that project in any way.
 * 
 * jQuery UI Google Map source code, copyrights, and licensing information:
 * http://code.google.com/p/jquery-ui-map/
 */

/*
 * This function is used to show a map of Trinity Church's location,
 * to get the device's current location if possible, and to process
 * and display directions using Google Maps.  The below function is 
 * essentially a very slightly modified version of one of the
 * jQuery UI Google Map plug-in demos.
 * 
 */

$(function() { 

    //This forces an immediate refresh to get the map to correctly render.
    $('#pageMap').live("pageshow", function() {

        //create the map with Trinity centered, zoom to street level.
        $('#map_canvas').gmap({'center': '40.69302,-75.20845', 'zoom': 16,
            'disableDefaultUI':true, 'callback': function() {
            var self = this;

            //add a Google Maps marker at Trinity's exact location.
            this.addMarker( { 'position': '40.69302,-75.20845' } );

            //attempt to get the device's current location.
            self.set('getCurrentPosition', function() {

                self.refresh();
                self.getCurrentPosition( function(position, status) {

                    //Device's current location was found.
                    if ( status === 'OK' ) {

                        var latlng =
                            new google.maps.LatLng(position.coords.latitude,
                                position.coords.longitude)

                        //Pan the map over to current location.
                        self.get('map').panTo(latlng);

                        //Check whether directions from current location exist.
                        self.search({ 'location': latlng },
                            function(results, status) {

                            //Directions were found.
                            if ( status === 'OK' ) {

                                //Display current location in "From" text box.
                                $('#from').val(results[0].formatted_address);
                            }
                        });

                    } else {
                        //Wasn't possible to get device's current location.
                        alert('Unable to get current position');
                    }
                });
            });

            //Display the directions when the user taps the appropriate button.
            $('#submit').click(function() {
                self.displayDirections({ 'origin': $('#from').val(),
                    'destination': $('#to').val(),
                    'travelMode': google.maps.DirectionsTravelMode.DRIVING },
                    { 'panel': document.getElementById('directions')},
                    function(response, status) {
                        ( status === 'OK' ) ? 
                                $('#results').show() : $('#results').hide();
                });
                return false;
            });
        }});
    });

});