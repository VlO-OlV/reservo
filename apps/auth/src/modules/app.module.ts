import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule, DatabaseModule, LoggerModule } from "@app/common";
import { AuthModule } from "./auth/auth.module";
import { validationSchema } from "../config/validation.schema";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}