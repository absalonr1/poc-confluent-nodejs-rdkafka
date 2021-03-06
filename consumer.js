/* Copyright 2020 Confluent Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 *
 * Consume messages from Confluent Cloud
 * Using the node-rdkafka client for Apache Kafka
 *
 * =============================================================================
 */

const Kafka = require('node-rdkafka');



var topic = "test-topic-aopazo"

let seen = 0;

const consumer = new Kafka.Kafkit aConsumer(
    {
        'bootstrap.servers': "pkc-pgq85.us-west-2.aws.confluent.cloud:9092",
        'sasl.username': "YLWHDZM2XQ5KUTNF",
        'sasl.password': "xxx",
        'security.protocol': "SASL_SSL",
        'sasl.mechanisms': "PLAIN",
        'group.id': 'node-example-rdkafka-group-1',
        'enable.auto.commit': false
        
    },{
        'auto.offset.reset': 'earliest'
    }
);

consumer.on('ready', () => { 
            console.log("Consumer ready !!"); 
            console.log("Subscribing...");
            consumer.subscribe([topic]);
            console.log(`Consuming records from ${topic}`);
            consumer.consume();
        }
    );

consumer.on('data', ({key, value, partition, offset}) => {
        console.log(`Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}. Updated total count to ${++seen}`)
    });
//logging debug messages, if debug is enabled
consumer.on('event.log', function(log) {
    console.log(log);
  });
  
  //logging all errors
  consumer.on('event.error', function(err) {
    console.error('Error from consumer');
    console.error(err);
  });

process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
});

console.log("Connecting...");
consumer.connect();