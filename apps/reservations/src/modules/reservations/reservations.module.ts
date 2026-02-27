import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, DatabaseModule, PAYMENTS_PACKAGE_NAME, PAYMENTS_SERVICE_NAME } from '@app/common';
import { ReservationsRepository } from './reservations.repository';
import { ReservationEntity } from './models/reservation.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    DatabaseModule.forFeature([
      ReservationEntity,
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../../../proto/auth.proto'),
            url: configService.get<string>('auth.grpcUrl'),
          },
        }),
      },
      {
        name: PAYMENTS_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: PAYMENTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../../../proto/payments.proto'),
            url: configService.get<string>('payments.grpcUrl'),
          },
        }),
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
