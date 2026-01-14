import { Module } from "@nestjs/common";
import { DatabaseModule, LoggerModule } from "@app/common";
import { PaymentsModule } from "./payments/payments.module";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    PaymentsModule,
  ],
})
export class AppModule {}