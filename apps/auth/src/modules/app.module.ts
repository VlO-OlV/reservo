import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule, DatabaseModule, HealthModule, LoggerModule } from "@app/common";
import { AuthModule } from "./auth/auth.module";
import { validationSchema } from "../config/validation.schema";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    UsersModule,
    AuthModule,
    HealthModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
  ],
})
export class AppModule {}