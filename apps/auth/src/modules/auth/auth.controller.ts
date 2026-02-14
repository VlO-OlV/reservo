import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guards/local.guard";
import { CurrentUser, UserEntity } from "@app/common";
import { Response } from "express";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtGuard } from "./guards/jwt.guard";

@Controller('auth')
export class AuthController {
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
  @MessagePattern('authenticate')
  async authenticate(
    @Payload() payload: any,
  ) {
    return payload?.user;
  }
}