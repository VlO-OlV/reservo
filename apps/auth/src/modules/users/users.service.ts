import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersRepository } from "./users.repository";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  public constructor(
    private readonly usersRepository: UsersRepository,
  ) {}

  public async create(data: CreateUserDto) {
    const existingUser = await this.findByEmail(data.email);

    if (existingUser) throw new BadRequestException('Such user already exists');

    return this.usersRepository.create({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User is not registered yet');
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  public async findByEmail(email: string) {
    return this.usersRepository.findOne({ email }, false);
  }

  public async findById(id: string) {
    return this.usersRepository.findOne({ id });
  }
}