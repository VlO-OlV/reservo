import { AbstractEntity } from "@app/common";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity('roles')
export class RoleEntity extends AbstractEntity<RoleEntity> {
  @Column()
  name: string;
}