#determine the environment 
FROM node=alpine

#determine work dir
WORKDIR /usr/src/app

#copy package.json file to work dir
COPY package.json  /usr/src/app/

#install all dep
RUN npm install

#copy all file to work dir
COPY . .

#run app
CMD ["npm", "run" ,"start:dev"]
