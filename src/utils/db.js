const mongoos = require('mongoose');
const conn = process.env.MONGODB_URI || 'mongodb://organization-service:passw0rd@localhost/orgdb'

const connect = async () => {
    await mongoos.connect(conn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

const disconnect = async () => {
    await mongoos.disconnect()
}

module.exports = {
    connect,
    disconnect
}