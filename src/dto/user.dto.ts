import { IsString, IsBoolean, IsEmail, IsNumber, Length, IsNotEmpty, } from "class-validator";


export class UserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11)
  phoneNumber: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @IsNotEmpty()
  salary: number;
}