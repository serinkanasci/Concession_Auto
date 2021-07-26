FROM ubuntu:20.04

# Install curl
RUN apt-get update
RUN apt install curl

# Install Docker
RUN apt-get update
RUN apt-get install apt-transport-https ca-certificates gnupg-agent software-properties-common
RUN curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
RUN add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu  $(lsb_release -cs)  stable"

# Install Docker engiune
RUN apt-get update
RUN apt-get install docker-ce docker-ce-cli containerd.io
RUN usermod -aG docker $USER

# Install Docker compose
RUN curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose

# Install Go
RUN curl -O https://storage.googleapis.com/golang/go1.12.9.linux-amd64.tar.gz
RUN tar -xvf go1.12.9.linux-amd64.tar.gz
RUN mv go /usr/local

RUN export GOPATH=$HOME/go
RUN export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# Install nodejs and npm
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
RUN apt-get install -y nodejs

# Install Hyperledger
RUN mkdir hyperledger
RUN cd hyperledger/
RUN curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.12 1.4.9 0.4.22
RUN export PATH=/home/$USER/hyperledger/fabric-samples/bin:$PATH

RUN git clone https://github.com/serinkanasci/Concession_Auto.git

RUN cd Concession_Auto/fabric-samples/
RUN git checkout release-1.4

RUN cd fabcar
RUN npm install
RUN ./stopFabric.sh
RUN ./startFabric.sh javascript
RUN cd javascript
RUN node enrollAdmin.js 
RUN node registerUser.js 
RUN node query.js