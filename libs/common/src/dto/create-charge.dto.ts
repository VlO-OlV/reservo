import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";
import { CreateChargeMessage } from "../types";
import { Field, InputType } from "@nestjs/graphql";

@InputType({ isAbstract: true })
export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDto)
  @Field(() => CardDto)
  card: CardDto;

  @IsNotEmpty()
  @IsNumber()
  @Field()
  amount: number;
};