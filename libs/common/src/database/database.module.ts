import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbHost = configService.get<string>('database.host');
        const dbUser = configService.get<string>('database.user');
        const dbPassword = configService.get<string>('database.password');
        const dbName = configService.get<string>('database.name');

        return {
          uri: `mongodb://${dbUser}:${dbPassword}@${dbHost}:27017/${dbName}?authSource=admin`,
        };
      },
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
