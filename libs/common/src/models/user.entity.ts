import { AbstractEntity } from "@app/common";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { RoleEntity } from "./role.entity";
import { Field, ObjectType } from "@nestjs/graphql";

@Entity('users')
@ObjectType()
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column()
  @Field()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, { cascade: true })
  @JoinTable()
  @Field(() => [RoleEntity], { nullable: true })
  roles?: RoleEntity[];
}