import { ApiModelProperty } from '@nestjs/swagger';
  
export class ListCarDto {

     @ApiModelProperty()
     public offset?: number ;

     @ApiModelProperty()
     public limit?: number;
     
}