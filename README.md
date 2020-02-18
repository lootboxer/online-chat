# Online chat for connection "operator-client"

<h2>
<a href="https://operator-chat.herokuapp.com/" target="_blank">
Example
<a/>
<h2/>
    
---

Online web-chat with using "socket.io" and "quasar"
---

# How to start.

> ⚠ Note: Before working with this, go to the back and front folder, respectively.

## On front (./front-end):

> Specify the path to the socket server (back) in the file `./src/lib/connect.ts` (so far without .env files)

### In development mode:

> npm i</br>npx quasar dev

### On production with docker

1. > `docker build -t build_spa .` 
2. > `docker run --expose 80 -p 8080:80 build_spa`

## On back (./back-end):

> Before all steps you should install npm dependencies by `npm i`
> After: 
1. `npm run start`
2. `npm run build`

