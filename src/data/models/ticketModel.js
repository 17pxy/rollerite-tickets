const mongoose = require('mongoose')

const ticketDB = new mongoose.Schema ({
    userID: String,
    channel: String,
    date: { type: Date, default: new Date()}
})

module.exports = mongoose.model('ticketDB', ticketDB);