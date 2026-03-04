import { AbstractEntity } from "@app/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";

@Entity('roles')
@ObjectType()
export class RoleEntity extends AbstractEntity<RoleEntity> {
  @Column()
  @Field()
  name: string;
}