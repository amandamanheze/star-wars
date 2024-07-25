import {
  IsArray,
    IsNotEmpty,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class CreatePilotDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    image: Buffer;
  }