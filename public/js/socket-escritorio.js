//Comando para establecer conexion

var socket = io();

var searchParams = new URLSearchParams( window.location.search);
var label = $('small')

if(! searchParams.has('escritorio')){
    window.location = 'index.html'
    
    console.log('El escritorio es necesario')
    throw new Error('El escritorio es necesario')
}

console.log('El escritorio esta')
var escritorio = searchParams.get(`escritorio`)

$('h1').text(`Escritorio ${escritorio}`)

socket.on('connect', function(){
    console.log('Conectado al server')
})

socket.on('disconnect', function(){
    console.log('Desonectado al server')
})


$('button').on('click', function() {
    console.log('click')

    socket.emit('atenderTicket', { escritorio: escritorio } , function(resp){
        console.log(resp)
        label.text(resp)

        if(resp === "No hay tickets") {
            label.text(resp)
             alert(resp)
            return
        }
           

        label.text('Ticket ' + resp.numero)
    })


})