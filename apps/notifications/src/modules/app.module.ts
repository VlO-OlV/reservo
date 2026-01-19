import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@app/common";
import { NotificationsModule } from "./notifications/notifications.module";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    NotificationsModule,
  ],
})
export class AppModule {}