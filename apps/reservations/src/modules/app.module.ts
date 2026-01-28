import { Module } from "@nestjs/common";
import { ReservationsModule } from "./reservations/reservations.module";
import { ConfigModule, DatabaseModule, LoggerModule } from "@app/common";
import { validationSchema } from "../config/validation.schema";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    ReservationsModule,
  ],
})
export class AppModule {}