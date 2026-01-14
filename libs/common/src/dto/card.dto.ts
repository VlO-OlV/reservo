import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CardDto {
  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNotEmpty()
  @IsNumber()
  expMonth: number;

  @IsNotEmpty()
  @IsNumber()
  expYear: number;

  @IsNotEmpty()
  @IsCreditCard()
  number: string;
};