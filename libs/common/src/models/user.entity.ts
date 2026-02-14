import { AbstractEntity } from "@app/common";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity('users')
export class UserEntity extends AbstractEntity<UserEntity> {
  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, { cascade: true })
  @JoinTable()
  roles?: RoleEntity[];
}