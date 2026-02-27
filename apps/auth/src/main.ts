import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { AppModule } from './modules/app.module';
import cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@app/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const httpPort = configService.get<number>('auth.httpPort') as number;

  app.connectMicroservice({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/auth.proto'),
      url: configService.get<string>('auth.grpcUrl'),
    },
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(httpPort, () =>
    console.log(`Auth service successfully started on port ${httpPort}`),
  );
}
bootstrap();
