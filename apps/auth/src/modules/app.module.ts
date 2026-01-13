import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { DatabaseModule, LoggerModule } from "@app/common";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}