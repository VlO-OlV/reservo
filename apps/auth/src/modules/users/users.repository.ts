import { AbstractRepository, UserEntity } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

@Injectable()
export class UsersRepository extends AbstractRepository<UserEntity> {
  protected readonly logger = new Logger(UsersRepository.name);

  public constructor(
    @InjectRepository(UserEntity)
    usersRepository: Repository<UserEntity>,
    entityManager: EntityManager,
  ) {
    super(usersRepository, entityManager);
  }
}
