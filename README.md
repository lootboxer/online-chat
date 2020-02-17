# online-chat
 Online web-chat on web-sockets

# Front-end
---
> Before all steps you should change directory to ./front-end

## Quasar-cli, node.js

1. > `npx quasar dev`

## With docker

1. > `docker build -t build_spa .` 
2. > `docker run --expose 80 -p 8080:80 build_spa`