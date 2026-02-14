import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationEntity } from "./models/reservation.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationEntity> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  public constructor(
    @InjectRepository(ReservationEntity)
    reservationsRepository: Repository<ReservationEntity>,
    entityManager: EntityManager,
  ) {
    super(reservationsRepository, entityManager);
  }
}