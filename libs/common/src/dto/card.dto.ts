import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CardMessage } from "../types";

export class CardDto implements CardMessage {
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