$(document).ready(function() {
    /*
    * Define the socket to the node server
    */
    socket = io('http://localhost:3000');
    /*
    * When you join register with the server
    */
    socket.on('connected', function(data) {
        console.log(data)
    })
})
