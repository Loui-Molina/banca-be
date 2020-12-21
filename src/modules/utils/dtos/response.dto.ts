import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto{
    @ApiProperty({type:String})
    message:string;
    @ApiProperty({type:[String]})
    error:string[];
    @ApiProperty({type:String})
    statusCode:number;
}