import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { AuthServiceController, AuthServiceControllerMethods, CurrentUser, UserEntity } from "@app/common";
import { Response } from "express";
import { Payload } from "@nestjs/microservices";
import { JwtGuard } from "./guards/jwt.guard";

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  public constructor(
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }

  @UseGuards(JwtGuard)
  async authenticate(
    @Payload() payload: any,
  ) {
    return payload?.user;
  }
}