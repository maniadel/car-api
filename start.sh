#docker build -t car-api . 
#docker run -ti --rm  -p 3000:3000 --name=api-car  car-api

npm update
docker-compose up



#docker run -ti --rm --name=api-car -v /$(pwd):/usr/src/app car-api
