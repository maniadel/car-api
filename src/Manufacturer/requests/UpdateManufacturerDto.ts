
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateManufacturerDto {


  @ApiModelProperty()
  public id?: string;

  @ApiModelProperty()
  public name?: string;

  @ApiModelProperty()
  public phone?: string;


  @IsString()
  @ApiModelProperty()
  public siret?: string;
}