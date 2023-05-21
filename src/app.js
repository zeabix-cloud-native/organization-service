const express = require('express')
const cors = require('cors');
const port = process.env.PORT || 3000;
const routes = require('./routes/index')
const database = require('./utils/db')
const messaging = require('./utils/messaging')

const { createHttpTerminator } = require('http-terminator')
require('log-timestamp');

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routes)

app.get('/health', (req, res) => {
    res.status(200).json({
        status: "ok"
    })
})

const server = app.listen(port, async (error) => {
    if (error){
        console.log(error.message)
        return;
    }

    await database.connect()
            .then(() => {
                console.log('Database is connected')
            })
            .catch((err) => {
                console.log(err.message)
            });

    await messaging.connect()
            .then(() => {
                console.log('Messaging is connected')
            })

    console.log(`Server listening at port ${port}`);
})

const terminator = createHttpTerminator({
    server,
});


const gracfully = () => {
    console.log(`Gracfully shutting down server.`);
    terminator.terminate();
    console.log(`Cleanup pending request`);

    messaging.disconnect();
    console.log(`Disconnected messaging`);

    database.disconnect();
    console.log(`Disconnected database`);
}

process.on('SIGTERM', gracfully);
process.on('SIGINT', gracfully);