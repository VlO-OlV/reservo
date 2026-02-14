import { AbstractEntity } from "@app/common";
import { Column, Entity } from "typeorm";

@Entity('reservations')
export class ReservationEntity extends AbstractEntity<ReservationEntity> {
  @Column({
    type: 'timestamp',
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
  })
  endDate: Date;

  @Column()
  userId: string;

  @Column()
  invoiceId: string;
}
