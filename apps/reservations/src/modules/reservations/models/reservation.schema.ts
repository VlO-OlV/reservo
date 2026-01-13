import { AbstractModel } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class ReservationModel extends AbstractModel {
  @Prop({ type: SchemaTypes.Date })
  startDate: Date;

  @Prop({ type: SchemaTypes.Date })
  endDate: Date;

  @Prop({ type: SchemaTypes.String })
  userId: string;

  @Prop({ type: SchemaTypes.String })
  placeId: string;

  @Prop({ type: SchemaTypes.String })
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(ReservationModel);