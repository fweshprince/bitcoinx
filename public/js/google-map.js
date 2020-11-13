;(function($) {
    "use strict";
    
    
    $(document).ready(function(){        
        
        /*----------------------------------------------------*/
        /*  Google Map
        /*----------------------------------------------------*/        
        var $lat = $('#mapBox').data('lat');
        var $lon = $('#mapBox').data('lon');
        var $zoom = $('#mapBox').data('zoom');
        var map = new GMaps({
            el: '#mapBox',
            lat: -12.043333,
            lng: -77.028333,
            scrollwheel: false,
            scaleControl: true,
            streetViewControl: false,
            panControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            zoom: $zoom,
        })  
        
    })
    
})(jQuery)