import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: configService.get<string>('notifications.grpcUrl'),
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
}
bootstrap();
