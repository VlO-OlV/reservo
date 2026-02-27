import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_PACKAGE_NAME, NOTIFICATIONS_SERVICE_NAME } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATIONS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../../../proto/notifications.proto'),
            url: configService.get<string>('notifications.grpcUrl'),
          },
        }),
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
