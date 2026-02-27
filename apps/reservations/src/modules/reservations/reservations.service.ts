import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE_NAME, PaymentsServiceClient, UserEntity } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map } from 'rxjs';
import { ReservationEntity } from './models/reservation.entity';

@Injectable()
export class ReservationsService implements OnModuleInit {
  private paymentsService: PaymentsServiceClient;

  public constructor(
    private readonly reservationsRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentsService = this.client.getService<PaymentsServiceClient>(PAYMENTS_SERVICE_NAME);
  }

  public async create(data: CreateReservationDto, { email, id }: UserEntity) {
    return this.paymentsService.createCharge({
      card: data.card,
      amount: data.amount,
      email,
    }).pipe(
      map((res) => {
        const reservation = new ReservationEntity({
          ...data,
          userId: id,
          invoiceId: res.id,
        });

        return this.reservationsRepository.create(reservation);
      })
    );
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
