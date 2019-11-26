
import {    
    IsNotEmpty,
    IsDefined,
    IsString,
    IsDate,
    IsPhoneNumber
  } from 'class-validator';
  import { Type } from 'class-transformer';

  import { ApiModelProperty } from '@nestjs/swagger';
  
export class CreateManufacturerDto {
   
    // @IsString() 
     public id?: string;

     @IsString()  
     @ApiModelProperty()
     public name: string;

     @IsPhoneNumber('fr')
     @ApiModelProperty()
     public phone?: string;
     
     @ApiModelProperty()
     public siret?: string;
}