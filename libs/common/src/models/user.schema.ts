import { AbstractModel } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { SchemaTypes } from "mongoose";

@Schema()
export class UserModel extends AbstractModel {
  @Prop({ type: SchemaTypes.String })
  email: string;

  @Prop({ type: SchemaTypes.String })
  password: string;

  @Prop()
  roles?: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);