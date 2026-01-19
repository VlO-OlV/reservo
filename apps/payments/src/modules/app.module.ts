import { Module } from "@nestjs/common";
import { ConfigModule, DatabaseModule, LoggerModule, NOTIFICATIONS_SERVICE } from "@app/common";
import { PaymentsModule } from "./payments/payments.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    PaymentsModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('notifications.host'),
            port: configService.get<number>('notifications.tcpPort'),
          },
        }),
      },
    ]),
  ],
})
export class AppModule {}