# online-chat
 Online web-chat on web-sockets
---

> Before all steps you should install npm dependencies by `npm i`

## In bash (on unix)

> `npm run start`

## With docker

1. > `docker build -t build_spa .` 
2. > `docker run --expose 80 -p 8080:80 build_spa`