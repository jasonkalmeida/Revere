# REVERE Server Specifications

This is a technical specifications document and user guide to the REVERE server, created in part by [Project Revere](https://github.com/jasonkalmeida/Revere) for the AtrocityWatch Hackathon at Cloudera HQ in Palo Alto on June 6, 2014.

This document is intended to provide ease of use and understanding for future development of Project Revere and the REVERE Server.

*Copyright 2014 - Project Revere*
*Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at*

> [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

*Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.*

## Table of Contents

1.  **[Maintainers](#maintainers)**
2.  **[Project Revere Team](#project-revere-team)**
3.  **[Capabilities](#capabilities)**
4.  **[Application Framework](#application-framework)**
5.  **[Deployment](#deployment)**
6.  **[Future Steps](#future-steps)**


## Maintainers

*   Aaron S. DeVera ([aaronsdevera@gmail.com](mailto:aaronsdevera@gmail.com),)
*   Jason K. Almeida ([jasonkalmeida@gmail.com](mailto:jasonkalmeida@gmail.com),)


## Project Revere Team

*   Jason K. Almeida (<jasonkalmeida@gmail.com>)
*   Aaron S. DeVera (<aaronsdevera@gmail.com>)
*   Sam Joseph (<samaj94@gmail.com>)
*   Sergey Serebryakov (<hellomind@gmail.com>)



## Capabilities

The REVERE Server is a lightweight web server built with Node.js and written in the Javascript programming language. It allows for SMS users to communicate with each other in a thread established and maintained by the REVERE Server. Users designate their location with a set syntax, allowing them to receive messages from other users flagged for that location. Any user can send a message to those in a given location by flagging a message with the location syntax. While developing nations do not have readily available internet access, SMS is extremely popular and common. Project REVERE mitigates the technology divide by utilizing APIs from Twilio and Twitter to read and write SMS messages and Tweets.

The intended usage for Project Revere was for foreign aid workers and NGOs who are actively operating in a given area. Project Revere is inteded to bridge communication gaps between SMS users and modern social media by routing messages between the two platforms to end users. In this form, Project Revere can assist in region-wide notifications, similar to an Amber-Alert type of system of mass-distributed notifications in a given proximity.  

The REVERE Server requires the installation of the following frameworks and libraries:

*   **Node.js**:

[Node.js](http://nodejs.org/) is a platform created for the development of web and network applications using the Javascript progamming language and other web frameworks. The REVERE Server is built on this platform and therefore requries Node.js to compile and run on a server.

*   **Twilio API**:

[Twilio](http://www.twilio.com/sms/api) is a service for using SMS and cellular utilities in programs. The REVERE Server uses Twilio to establish a unique phone number that is maintained and monitored by the server. With this number, user phone numbers can text messages to the REVERE server for processing and the REVERE server can distribute messages to user phone numbers for transmission.

*   **Twitter API**:

[Twitter](http://www.twilio.com/sms/api) is a popular social media platform for many internal organizations' communications. Our inclusion of the Twitter API in Project Revere makes the system cross-platform and bridges gaps between SMS users and modern social media users.


## Application Framework

The files necessary to run a REVERE server are all in the same folder-level repository:  

`REVERE SERVER - MASTER FOLDER  `

`|- SERVER.JS`  
`|- RECEIVEMESSAGE.JS`  
`|- PARSEMESSAGE.JS`  
`|- SENDMESSAGE.JS`  
`|- TWEETMESSAGE.JS`  


**NOTE: This document will continue to describe functions that may not be reproducable without the installation of Node.js. To test and deploy the following functions, make sure Node.js is installed.**

**NOTE: The Github repository for Project Revere does not include the original API keys that are necessary to run the REVERE web server. New keys must be created and insert in the designated areas of the program.**

The software architecture of the REVERE server was intentionally built with the principles of modular funcitons and features. As such, entire features are siphoned into separate Javascript files, and are interpreted by the server to enable the funcitonality in the server. This is an architecture that fit the needs of the Project Revere team, as we delegated the task of each function to a different team member. Future functionality of the REVERE server can be expanded by simply making new features in separate Javacript files and including the logic to interpret them in `server.js`. 

An overview of the software architecture of Project Revere is as follows:

*   **server.js**:

The REVERE server can be found at the file `server.js`. It can be run by opening up your computer's commandline (such as the Terminal application in OSX) and using the command `node server.js`. This command will initiate the REVERE server and create an active, running instance.

*   **receivemessage.js**:

The function `receivemessage.js` is neccessary to saving text messages as objects to be interpeted and later distributed by the server. When interpreted by the REVERE server, the server runs the data fetched by `receivemessage.js` through `parsemessage.js` in order to turn the raw data into the dual object of message `LOCATION` and message `CONTENT`.

*   **parsemessage.js**:

The function `parsemessage.js` is required to turn messages into readable data objects by the server. Messages sent to the REVERE server follow the following syntax: `[LOCATION];[CONTENT]`. This function separates the raw message into the two separate elements that can be referenced and interpreted by the server.

*   **sendmessage.js**:

The function `sendmessage.js` is arms the REVERE server with the ability to send out SMS messages. The parametes obtained by the server enable this function to calculate the message recipient (`TO`), the original send of the message (`FROM`), and the message content (`BODY`).

*   **tweetmessage.js**:

The function `tweetmessage.js` is enables the REVERE server to simultaneously post a message to Twitter while simultaneously distributing SMS messages. This function can be altered to post to an established Twitter account, such as a Twitter account managed by the organization running the REVERE web server. 

**NOTE: The function `tweetmessage.js` is similar to `sendmessage.js` in that it it arms the server with pure writing capability. It cannot read or parse tweets, which is a functionality Project Revere had planned on in the original build but did not yet complete at the time for demonstration.**

## Deployment

A REVERE server can be established on any local computer by use of Node.js. Using Terminal, this can me accomplished by navigating to the repository folder and using the command `node server.js`.

For practicial purposes the best deployment of a REVERE server will be on a web server with Node.js installed. Many services offer different plans for web hosting, and some web hosts offer preconfigured options for Node.js. [Amazon Web Services](http://aws.amazon.com/sdkfornodejs/) has hosting options and documentation for supporting Node.js, as does [Nodejitsu](https://www.nodejitsu.com/paas/) and [Heroku](https://www.heroku.com/features), two popular hosts for Node.js applications. Due to the popularity of Node.js, most competetive web hosting services offer documentation concerning the installation of Node.js, if not some sort of preconfigured access.

The original Project Revere was hosted using [Digtal Ocean](https://www.digitalocean.com/), which granted us an IP address and SFTP capabilities to move our local working directories to the Digital Ocean server. Once the master repository was installed in the correct web hosting directory on our Digital Ocean hosted server, we ran the command `node server.js` and activated the instance of the REVERE server. These steps are reproducable amongst most web hosting services. 

**NOTE: By navigating to the web hosted IP address in a web browser, `index.html` will be displayed. Currently there are no features worth mentioning in `index.html` but this page would be the one to devlop for a macro-view operator module. This will be a web-accessed page that visualizes the location of all transactions that are pinging the REVERE server as well as the identities of the users as indentified by the REVERE server.**

## Future Steps
* **Expand functionality of REVERE server to read and parse tweets**

This will be an integral feature along the orignial goal to bridge gap between SMS and social media technologies in the field.
* **Implement threshold and curation functionality to prevent 
spam** 

Systems and functions that can help aid and authenticate users of a specific REVERE server. This may include the ability to block some phone numbers or maintain communications amongst only a few select user phone numbers.
* **Incorporate natural language processing to increase 
usability**

This may be able to be completed in the current function `parsemessage.js`. A REVERE server could be able to read a message for keywords (eg. "bomb" or "evacuation") and distribute that message faster by flagging it as a priority message.
* **Logging and location triangulation for visualization**

A macro-view module can be developed off of the logged transactions in the REVERE server. An index.html page using a Google Maps display can visualize the location and identity of each message sent and receieved to REVERE for the owner of the REVERE server to operate.
* **Utilize other social networks and inputs**

Other messages from devices can be developed for use with the REVERE server, such as PGP-encrypted messages or Facebook messages. 
* **Collaboration with cellular carriers for increased 
verification and scale**

Project Revere can be made more efficient and scalable through collaboration with cellular networks. Some sort of relationship that grants Project Revere functionality with cellular networks' SMS read/write capability would cut out the need for the Twilio API and make the REVERE server able to handle a larger amount of requests.
