const { io } = require('./../server')
const { TicketControl } = require('../classes/ticket-control')

const tc = new TicketControl();

io.on('connection', (client) => {
    console.log('usuario conectado')
})

io.on('connection', (client) => {
    console.log('usuario conectado')

    client.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    //escuchar cliente
    client.on('siguienteTicket', (data,callback) => {
        let siguiente = tc.siguiente()
        
        console.log(siguiente)

        callback(siguiente)
    })
    
    client.emit('estadoActual', {
        actual: tc.getUltimoTicket(),
        ultimos4: tc.getUltimos4()
    })
    
    client.on('atenderTicket', (data,callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es obligatorio'
            })
        }

        let atenderTicket = tc.atenderTicket(data.escritorio)

        
    
        client.broadcast.emit('ultimos4', {
            actual: tc.getUltimoTicket(),
            ultimos4: tc.getUltimos4()
        })

        callback(atenderTicket)

        //actualizar /notificar cambios en los ultimos 4

        
    })

    
})