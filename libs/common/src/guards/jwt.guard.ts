import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_SERVICE } from "../constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { catchError, map, Observable, of, tap } from "rxjs";
import { UserDto } from "../dto";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}
  
  canActivate(context: ExecutionContext): Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) {
      throw new UnauthorizedException();
    }
    return this.authClient.send<UserDto>('authenticate', {
      Authentication: jwt,
    }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
      catchError(() => of(false)),
    );
  }
}