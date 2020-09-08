//Comando para establecer conexion

var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function(){
    console.log('Conectado al server')
})

socket.on('disconnect', function(){
    console.log('Desonectado al server')
})

socket.emit('estadoActual',null, function(actual){
    label.text(actual)
})

$('button').on('click', function() {
    console.log('click')

    socket.emit('siguienteTicket',null, function(siguienteTicket){
        label.text(siguienteTicket)
    })
})