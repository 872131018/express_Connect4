$(document).ready(function() {
    /*
    * Listen for click on cells
    */
    $(document).on('click', '[data-id]', function(event) {
        /*
        * Extract relevant data for actions
        */
	    var $clicked_element = $(event.target)
        /*
        * Extract the move from the clicked cell
        */
        var move = $clicked_element.data('id').split(',')
        /*
        * Send the move down the socket
        */
        socket.emit('piece_dropped', {
            layer: move[0],
            row: move[1],
            cell: move[2]
        })
        socket.on('cube_update', function(data) {
            $('#cube_container').html(data)
            /*
            * Get the current layer as a number
            */
    	    var current_layer = parseInt($('#current_layer').text())
            /*
            * Hide current layer and show the new layer
            */
            $('.layer').hide()
            $('#layer'+current_layer).show()
        })
    })
})
