import { Module } from "@nestjs/common";
import { ConfigModule, DatabaseModule, LoggerModule } from "@app/common";
import { PaymentsModule } from "./payments/payments.module";
import { validationSchema } from "../config/validation.schema";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    PaymentsModule,
  ],
})
export class AppModule {}