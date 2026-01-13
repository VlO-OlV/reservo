import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { ReservationModel } from "./models/reservation.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationModel> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  public constructor(
    @InjectModel(ReservationModel.name) reservationModel: Model<ReservationModel>,
  ) {
    super(reservationModel);
  }
}