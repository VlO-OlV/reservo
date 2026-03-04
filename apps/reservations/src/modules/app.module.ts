import { Module } from "@nestjs/common";
import { ReservationsModule } from "./reservations/reservations.module";
import { ConfigModule, DatabaseModule, HealthModule, LoggerModule } from "@app/common";
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
    ReservationsModule,
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