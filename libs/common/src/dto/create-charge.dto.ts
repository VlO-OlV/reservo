import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";
import { CreateChargeMessage } from "../types";

export class CreateChargeDto implements Omit<CreateChargeMessage, 'email'> {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
};