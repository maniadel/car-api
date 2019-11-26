
import {    
    IsNotEmpty,
    IsDefined,
    IsString,
    IsDate
  } from 'class-validator';
  import { Type } from 'class-transformer';

  import { ApiModelProperty } from '@nestjs/swagger';
  
export class CreateOwnerDto {
   
    // @IsString() 
     public id?: string;

     @IsNotEmpty({message: 'name should not be empty'})
     @IsDefined()
     @IsString()  
     @ApiModelProperty()
     public name: string;

     @IsNotEmpty()
     @IsDefined()
     @IsDate()    
     @Type(() => Date)
     @ApiModelProperty()
     public purchaseDate: Date;
}