import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class DeleteCarDto {

  @IsString()
  @IsNotEmpty()
  @ApiModelProperty()
  public id: string;

}