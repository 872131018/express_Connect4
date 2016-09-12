$(document).ready(function() {
    /*
    * Listen for click on arrows
    */
    $(document).on('click', '[data-direction=up]', function(event) {
        /*
        * Get the current layer as a number
        */
        var current_layer = parseInt($('#current_layer').text())
        /*
        * Set the new layer to show
        */
        current_layer = current_layer + 1
        if(current_layer > 6) {
            current_layer = 6
        }
        $('#current_layer').text(current_layer)
        /*
        * Hide current layer and show the new layer
        */
        $('.layer').hide()
        $('#layer'+current_layer).show()
    })
})
