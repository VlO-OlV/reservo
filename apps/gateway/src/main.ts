import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.modules';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { setApp } from './app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.get<number>('gateway.httpPort') as number;

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.listen(httpPort, () =>
    console.log(`Gateway successfully started on port ${httpPort}`),
  );
  setApp(app);
}
bootstrap();
