import { UserEntity } from "@app/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Resolver(() => UserEntity)
export class UsersResolver {
  public constructor(
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => UserEntity)
  public async createUser(
    @Args('createUserInput')
    createUserInput: CreateUserDto,
  ) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => [UserEntity], { name: 'users' })
  public async findAll() {
    return this.usersService.findAll();
  }
}