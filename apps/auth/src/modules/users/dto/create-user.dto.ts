import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { RoleDto } from "./role.dto";
import { Type } from "class-transformer";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  @Field(() => [RoleDto], { nullable: true })
  roles?: RoleDto[];
}