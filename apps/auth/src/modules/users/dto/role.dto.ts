import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class RoleDto {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Field({ nullable: true })
  name?: string;
}