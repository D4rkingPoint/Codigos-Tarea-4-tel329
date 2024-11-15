'use strict';
var EventHubClient = require('azure-event-hubs').Client;
var connectionString = 'Endpoint=sb://ihsuprodblres039dednamespace.servicebus.windows.net/;SharedAccessKeyName=iothubowner;SharedAccessKey=HqxyQdsaMk2C2YrgPv1ZhyQNFDrECa52jAIoTJbSQyM=;EntityPath=iothub-ehub-tarea4-62930081-1c740b82b8';


var printError = function(err){
    console.log(err.message);
};

var printMessage = function(message){
    console.log('Message received:');
    console.log(JSON.stringify(message.body));
    console.log('');
};

var client = EventHubClient.fromConnectionString(connectionString);
    client.open()
        .then(client.getPartitionIds.bind(client))
        .then(function (partitionIds){
            return partitionIds.map(function(partitionId){
                return client.createReceiver('$Default',partitionId,
                                             {'startAfter-Time':Date.now()}).then(function(receiver){
                                                console.log('Created partition receiver:'+ partitionId)
                                                receiver.on('errorReceived',printError);
                                                receiver.on('message',printMessage);
                                             });                                   
            });
        })
    .catch(printError);

