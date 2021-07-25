FROM ubuntu:20.04

RUN git clone https://github.com/serinkanasci/Concession_Auto.git

RUN cd Concession_Auto/fabric-samples/fabcar

RUN ./stopFabric.sh
RUN ./startFabric.sh javascript
RUN cd javascript
RUN node enrollAdmin.js 
RUN node registerUser.js 
RUN node query.js