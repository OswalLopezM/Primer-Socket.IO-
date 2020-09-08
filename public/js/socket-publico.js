
var socket = io();
var labelTiecket1 = $('#lblTicket1')
var labelTiecket2 = $('#lblTicket2')
var labelTiecket3 = $('#lblTicket3')
var labelTiecket4 = $('#lblTicket4')

var labelEscritorio1 = $('#lblEscritorio1')
var labelEscritorio2 = $('#lblEscritorio2')
var labelEscritorio3 = $('#lblEscritorio3')
var labelEscritorio4 = $('#lblEscritorio4')

var lblTickets = [
    labelTiecket1,
    labelTiecket2,
    labelTiecket3,
    labelTiecket4,
]
var lblEscritorios = [
    labelEscritorio1,
    labelEscritorio2,
    labelEscritorio3,
    labelEscritorio4,
]

socket.on('connect', function(){
    console.log('Conectado al server')
})

socket.on('disconnect', function(){
    console.log('Desonectado al server')
})

socket.on('estadoActual', function(resp){
    console.log(resp)
    actualizarHTML(resp.ultimos4)
    
})

socket.on('ultimos4', function(resp){
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(resp.ultimos4)
})

function actualizarHTML( ultimos4){

    for(var i=0; i < ultimos4.length ; i++){
        lblTickets[i].text('Ticket '+ ultimos4[i].numero)
        lblEscritorios[i].text('Escritorio '+ ultimos4[i].escritorio)
    }
}