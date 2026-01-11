import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

@Injectable()
export class ReservationsService {

  public constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  public async create(data: CreateReservationDto & { userId: string }) {
    return this.reservationsRepository.create({
      ...data,
    });
  }

  public async findAll() {
    return this.reservationsRepository.findMany({});
  }

  public async findById(id: string) {
    return this.reservationsRepository.findOne({ id });
  }

  public async updateById(id: string, data: UpdateReservationDto) {
    return this.reservationsRepository.updateOne({ id }, { ...data });
  }

  public async deletById(id: string) {
    return this.reservationsRepository.deleteOne({ id });
  }
}
