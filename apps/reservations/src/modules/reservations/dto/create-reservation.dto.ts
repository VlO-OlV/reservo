import { CreateChargeDto } from '@app/common';
import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReservationDto extends CreateChargeDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Field()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Field()
  endDate: Date;
}
