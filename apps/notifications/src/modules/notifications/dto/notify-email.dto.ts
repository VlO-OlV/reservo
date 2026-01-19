import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class NotifyEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}