
import {    
    IsNotEmpty,
    IsDefined,
    IsDate
  } from 'class-validator';
  import { Type } from 'class-transformer';

  import { ApiModelProperty } from '@nestjs/swagger';

import { CreateManufacturerDto } from '../../Manufacturer/requests/CreateManufacturerDto';
import { CreateOwnerDto } from '../../owner/requests/CreateOwnerDto';
  

export class CreateCarDto {   
    
     public id?: string;  

     @IsNotEmpty()
     @IsDefined()
     @IsDate()    
     @Type(() => Date)
     @ApiModelProperty()
     public firstRegistrationDate: Date;

     @IsNotEmpty()
     @ApiModelProperty()
     public price: number;

     @ApiModelProperty()
     public manufacturer: CreateManufacturerDto;

     @ApiModelProperty()
     public owners: [CreateOwnerDto]; 
};