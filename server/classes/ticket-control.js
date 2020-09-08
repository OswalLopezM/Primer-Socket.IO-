const fs = require('fs');
const { timeEnd } = require('console');

class Ticket {

    constructor(numero,escritorio){
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor(){
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = []
        this.ultimosCuatro = []

        let data = require('../data/data.json')

        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo
            this.tickets = data.tickets
            this.ultimosCuatro = data.ultimosCuatro
        }else{
            this.reiniciarConteo()
        }
        
    }

    siguiente(){
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo,null)
        this.tickets.push(ticket)
        this.grabarArchivo()

        console.log('se ha actualizado el dia')

        return `Ticket ${this.ultimo}`
    }

    reiniciarConteo(){
        this.ultimo = 0
        this.tickets = []
        this.ultimosCuatro = []
        this.grabarArchivo()

        console.log('se ha reiniciado el sistema')
    }

    grabarArchivo(){
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        }

        console.log(jsonData)

        let jsonDataString = JSON.stringify(jsonData)
        fs.writeFileSync('./server/data/data.json',jsonDataString);
    }

    getUltimoTicket(){
        return `Ticket ${this.ultimo}`
    }

    getUltimos4(){
        return this.ultimosCuatro
    }

    atenderTicket( escritorio){
        if(this.tickets.length === 0 ){
            return "No hay tickets"
        }
        
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket,escritorio);

        this.ultimosCuatro.unshift(atenderTicket);

        if(this.ultimosCuatro.length > 4){
            this.ultimosCuatro.splice(-1,1)
        }

        console.log('Ultimos 4');

        console.log(this.ultimosCuatro)

        this.grabarArchivo();

        return atenderTicket

    }
}

module.exports = {
    TicketControl
}