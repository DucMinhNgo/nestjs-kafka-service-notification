FROM node
RUN mkdir -p /server
WORKDIR /server

ADD . ./
RUN yarn install --immutable