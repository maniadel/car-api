import {MongooseModule}  from '@nestjs/mongoose';
import {config} from './config'

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment].connection;

export const Connection =  MongooseModule.forRoot(environmentConfig, {useNewUrlParser: true, useUnifiedTopology: true});

