import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions, ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({})
export class ConfigModule {
  static forRoot(
    options: Pick<ConfigModuleOptions, 'validationSchema'>,
  ): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        NestConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
          load: [configuration],
          validationSchema: options.validationSchema,
          validationOptions: {
            abortEarly: false,
            allowUnknown: true,
          },
        }),
      ],
      exports: [NestConfigModule],
    };
  }
}