import { Module } from "@nestjs/common";
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME, ConfigModule, DatabaseModule, HealthModule, LoggerModule } from "@app/common";
import { validationSchema } from "../config/validation.schema";
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { ConfigService } from "@nestjs/config";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";
import { authContext } from "../auth.context";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ConfigModule.forRoot({
      validationSchema,
    }),
    HealthModule,
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        server: {
          context: authContext,
        },
        gateway: {
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              {
                name: 'reservations',
                url: configService.getOrThrow<string>('reservations.graphQlUrl'),
              },
              {
                name: 'auth',
                url: configService.getOrThrow<string>('auth.graphQlUrl'),
              }
            ],
          }),
          buildService({ url }) {
            return new RemoteGraphQLDataSource({
              url,
              willSendRequest({ request, context }) {
                request.http?.headers.set(
                  'user',
                  context.user ? JSON.stringify(context.user) : '',
                );
              },
            });
          },
        },
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/auth.proto'),
            url: configService.get<string>('auth.grpcUrl'),
          },
        }),
      },
    ]),
  ],
})
export class AppModule {}