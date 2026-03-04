import { AbstractEntity } from "@app/common";
import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";

@Entity('reservations')
@ObjectType()
export class ReservationEntity extends AbstractEntity<ReservationEntity> {
  @Column({
    type: 'timestamp',
  })
  @Field()
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  @Field()
  endDate: Date;

  @Column()
  @Field()
  userId: string;

  @Column()
  @Field()
  invoiceId: string;
}
