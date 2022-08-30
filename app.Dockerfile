FROM golang:1.18-alpine3.14 as GOBUILDER

WORKDIR /wd
COPY server .
RUN go build .

FROM node:18-alpine3.14 as NODEBUILDER

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add git bash
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN apk add make openssh
RUN apk add build-base

WORKDIR /wd
COPY . .
RUN npx yarn install
RUN npm run build

FROM alpine:3.14

WORKDIR /wd
COPY --from=GOBUILDER /wd/server server
COPY --from=NODEBUILDER /wd/dist dist
CMD ["/wd/server","/wd/dist"]
