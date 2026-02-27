import { CanActivate, ExecutionContext, Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Reflector } from "@nestjs/core";
import { AUTH_SERVICE_NAME, AuthServiceClient } from "../types";

@Injectable()
export class JwtGuard implements CanActivate, OnModuleInit {
  private readonly logger = new Logger(JwtGuard.name);
  private authService: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }
  
  canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authService.authenticate({
      Authentication: jwt,
    }).pipe(
      tap((res) => {
        for (const role of (roles || [])) {
          if (!res.roles?.includes(role)) {
            this.logger.error('The user does not have valid roles');
            throw new UnauthorizedException();
          }
        }
        context.switchToHttp().getRequest().user = { ...res };
      }),
      map(() => true),
      catchError((error) => {
        this.logger.error(error);
        return of(false);
      }),
    );
  }
}