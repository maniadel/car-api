FROM nestjs/cli
#FROM node:10

WORKDIR /usr/src/app

#RUN npm i -g typescript

# because we linked to local folder
#cd car-api
#RUN npm install

# Bundle app source
COPY . .
RUN npm install


EXPOSE 3000 

CMD [ "npm", "run", "start:dev"] 
#CMD ["/bin/bash"]