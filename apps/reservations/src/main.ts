import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './module/reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port') as number;

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.listen(port, () =>
    console.log(`Reservations service successfully started on port ${port}`),
  );
}
bootstrap();
