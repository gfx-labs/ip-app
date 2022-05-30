FROM node:18-alpine3.14

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
RUN mv /wd/dist /dist
RUN rm -rf *
CMD ["npx","http-server","-p $PORT","/dist"]
