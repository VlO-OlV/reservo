import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({ versionKey: false, timestamps: true })
export class AbstractModel {
  @Prop({ type: SchemaTypes.String, default: uuidv4 })
  id: string;

  @Prop({ type: SchemaTypes.Date })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date })
  updatedAt: Date;
}