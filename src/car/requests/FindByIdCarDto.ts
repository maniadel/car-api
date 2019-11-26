import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class FindByIdCarDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public id: string;

}