import { Module } from "@nestjs/common";
import { ReservationsModule } from "./reservations/reservations.module";
import { AUTH_SERVICE, ConfigModule, DatabaseModule, LoggerModule, PAYMENTS_SERVICE } from "@app/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ReservationsModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('auth.host'),
            port: configService.get<number>('auth.tcpPort'),
          },
        }),
      },
      {
        name: PAYMENTS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('payments.host'),
            port: configService.get<number>('payments.tcpPort'),
          },
        }),
      },
    ]),
  ],
})
export class AppModule {}