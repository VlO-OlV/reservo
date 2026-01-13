import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { UserModel } from "../users/models/user.schema";
import { TokenPayload } from "./types";
import { Response } from "express";
import { UserDto } from "@app/common";

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDto, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    const maxAge = this.configService.get<number>('jwt.ttl');

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      maxAge,
    });

    return token;
  }
}