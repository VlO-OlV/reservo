import { Module } from "@nestjs/common";
import { ConfigModule, DatabaseModule, LoggerModule } from "@app/common";
import { NotificationsModule } from "./notifications/notifications.module";
import { validationSchema } from "../config/validation.schema";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    NotificationsModule,
  ],
})
export class AppModule {}