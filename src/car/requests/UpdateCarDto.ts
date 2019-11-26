
import {
  IsNotEmpty,
  IsDefined,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

import { UpdateManufacturerDto } from '../../Manufacturer/requests/UpdateManufacturerDto';
import { UpdateOwnerDto } from '../../owner/requests/UpdateOwnerDto';



export class UpdateCarDto {
  
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
  public manufacturer: UpdateManufacturerDto;

  @ApiModelProperty()
  public owners: [UpdateOwnerDto];
};