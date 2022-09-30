# Silo AI - Edge server

This project consists of the code for running a verifiable software vsw repo. 

## Table of contents

1. [ About the project ](#About)
2. [ Getting started ](#Getting)
3. [ Run edge server locally ](#locally)
4. [ Run edge server inside docker](#runindocker)
5. [ Run docker in Azure IoT Edge ](#edge)
6. [ Silo AI ](#SILO)

<a a name=#About></a>
## About the project

Edge-server is server part of the project VQC Edge AI. other parts can be be found in a separate repos. For details about the Azure IoT Edge, see [EDGE](https://github.com/verifiablesoftware/vsw) which contains the info about. This repo is intended to to be used as edge server for handling edge module configurations. Internal structure of the Node.js based server can been seen in the image below.

![architecture](./images/Edge.png)

<a a name=#Getting></a>
## Getting started

Clone this edge-server repo to youur local machine with 
```
git clone TODO
```

There are a set of shell scripts provided with the code repository. Some explanation of the scripts can be found below.

<a a name=#locally></a>
## Run edge server locally

```
npm install 
```

and start the server by using:
```
npm run start
```

or 
```
npm run start-dev
```


```
./edge-server-start-local.sh
```
this script starts node server with [nodemon](https://nodemon.io/), see package.json and start-dev script

or for Visual Studio Code debugging [VS Code](https://code.visualstudio.com/), there is ```Run locally start``` launch.json that launches local  debugging.


<a name=#runindocker></a>
## Run inside the docker

build docker image(s) 

```
./local-build.sh
```

or

```
docker build -f Dockerfile.dev -t edge-server .
```

## run container with docker
and for example use the ports 8040
```
docker run -d --name edge-server -p 8060:8040 edge-config-server
```

<a name=#edge></a>
## Run edge-server in edge device

1. build container
2. push to ACR
3. deploy to edge device with relevant other modules


```
docker tag edge-config-server:latest siloiot.azurecr.io/edge-config-server:v1
az acr login --name siloiot.azurecr.io
docker push siloiot.azurecr.io/edge-config-server:v1
```

<a name=#SILOAI></a>
## Silo AI

