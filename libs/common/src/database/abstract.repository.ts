import { AbstractEntity } from "./abstract.entity";
import { Logger, NotFoundException } from "@nestjs/common";
import { EntityManager, FindOptionsRelations, FindOptionsWhere, QueryDeepPartialEntity, Repository } from "typeorm";

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected abstract readonly logger: Logger;

  constructor (
    private readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
  ) {}

  public async create(data: T): Promise<T> {
    return this.entityManager.save(data);
  }

  public async findOne(where: FindOptionsWhere<T>, relations?: FindOptionsRelations<T>, errorEnabled: boolean = true): Promise<T | null> {
    const entity = await this.entityRepository.findOne({ where, relations });

    if (!document) {
      this.logger.warn('Entity was not found with such where', where);
      if (errorEnabled) throw new NotFoundException('Entity was not found');
    }

    return entity;
  }

  public async updateOne(where: FindOptionsWhere<T>, data: QueryDeepPartialEntity<T>): Promise<T> {
    const existingEntity = await this.findOne({ ...where });

    await this.entityRepository.update({ ...where }, { ...data });

    return {
      ...(existingEntity as T),
      ...data,
    };
  }

  public async findMany(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.find({ where });
  }

  public async deleteOne(where: FindOptionsWhere<T>): Promise<T> {
    const existingDocument = await this.findOne({ ...where });

    await this.entityRepository.delete({ ...where });

    return { ...(existingDocument as T) };
  }
}