#!/bin/bash

cd ./server 
npm i 

tsc index.ts
nohup node ./index.js &

cd ./..

npx quasar dev