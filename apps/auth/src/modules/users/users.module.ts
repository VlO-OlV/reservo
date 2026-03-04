import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { DatabaseModule, RoleEntity } from '@app/common';
import { UserEntity } from '@app/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [
    DatabaseModule.forFeature([
      UserEntity,
      RoleEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
