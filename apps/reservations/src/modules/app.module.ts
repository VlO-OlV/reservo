import { Module } from "@nestjs/common";
import { ReservationsModule } from "./reservations/reservations.module";
import { DatabaseModule, LoggerModule } from "@app/common";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ReservationsModule,
  ],
})
export class AppModule {}