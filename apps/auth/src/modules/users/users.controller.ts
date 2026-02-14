import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '@app/common';
import { UserEntity } from '@app/common';

@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  public async createUser(
    @Body() data: CreateUserDto,
  ) {
    return this.usersService.create({ ...data });
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async getUser(@CurrentUser() user: UserEntity) {
    return user;
  }
}
