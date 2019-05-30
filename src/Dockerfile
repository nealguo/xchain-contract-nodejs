FROM node:11.13.0-alpine

# copy core and lib
COPY xchain /opt/app/src/xchain

# copy package.json
COPY package.json /opt/app/src/package.json

# install other modules
WORKDIR /opt/app/src
RUN npm install