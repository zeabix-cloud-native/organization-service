const { Kafka } = require('kafkajs');
const { v4:uuidv4 } = require('uuid')
const os = require('os');
const hostname = os.hostname();


const brokerUrl = process.env.KAFKA_BROKER_ADDRESSES || 'kafka-deployment-8656dc4dd8-2zlpd:9092'

const kafka = new Kafka({
    clientId: hostname,
    brokers: [brokerUrl]
});

const producer = kafka.producer()

const connect = async () => {
    await producer.connect();
    console.log(`Kafka connected: ${brokerUrl}`)
}

const publish = async (topic, orgEvent) => {
    await producer.send({
        topic,
        messages: [
            {
                key: uuidv4(),
                value: JSON.stringify(orgEvent)
            }
        ]
    });
}

const disconnect = async() => {
    producer.disconnect();
}

module.exports = {
    connect,
    disconnect,
    publish
}



