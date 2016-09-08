$(document).ready(function() {
    /*
    * Listen for click on arrows
    */
    $(document).on('click', function(event) {
        /*
        * Extract relevant data for actions
        */
	    var $clicked_element = $(event.target)
        var current_layer = $('#current_layer').text()
        /*
        * Set the new layer to show
        */
        switch($clicked_element.data('direction')) {
            case 'up':
                current_layer = parseInt(current_layer) + 1
                if(current_layer > 6) {
                    current_layer = 6
                }
                break;
            case 'down':
                current_layer = parseInt(current_layer) - 1
                if(current_layer < 0) {
                    current_layer = 0
                }
                break;
        }
        $('#current_layer').text(current_layer)
        /*
        * Hide current layer and show the new layer
        */
        $('.layer').hide()
        $('#layer'+current_layer).show()
    })
})
