
import {
  IsString,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOwnerDto {

  @ApiModelProperty()
  public id?: string;


  @ApiModelProperty()
  public name?: string;


  @Type(() => Date)
  @ApiModelProperty()
  public purchaseDate?: Date;
}