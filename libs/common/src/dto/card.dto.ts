import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CardMessage } from "../types";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CardDto implements CardMessage {
  @IsNotEmpty()
  @IsString()
  @Field()
  cvc: string;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  expMonth: number;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  expYear: number;

  @IsNotEmpty()
  @IsCreditCard()
  @Field()
  number: string;
};