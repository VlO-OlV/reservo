import { CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, map, Observable, of, tap } from "rxjs";
import { Reflector } from "@nestjs/core";
import { UserEntity } from "../models";

@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name);

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
    private readonly reflector: Reflector,
  ) {}
  
  canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      throw new UnauthorizedException();
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    return this.authClient.send<UserEntity>('authenticate', {
      Authentication: jwt,
    }).pipe(
      tap((res) => {
        for (const role of (roles || [])) {
          if (!res.roles?.map((r) => r.name).includes(role)) {
            this.logger.error('The user does not have valid roles');
            throw new UnauthorizedException();
          }
        }
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
      catchError((error) => {
        this.logger.error(error);
        return of(false);
      }),
    );
  }
}