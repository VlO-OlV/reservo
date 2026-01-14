import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CardDto } from "./card.dto";

export class CreateChargeDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
};