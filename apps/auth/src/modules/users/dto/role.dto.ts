import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class RoleDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;
}