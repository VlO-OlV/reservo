import { Model, QueryFilter, UpdateQuery } from "mongoose";
import { AbstractModel } from "./abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TModel extends AbstractModel> {
  protected abstract readonly logger: Logger;

  constructor (
    protected readonly model: Model<TModel>,
  ) {}

  public async create(data: Omit<TModel, 'id' | 'createdAt' | 'updatedAt'>): Promise<TModel> {
    const document = new this.model({
      ...data,
    });
    const savedDocument = await document.save();
    return savedDocument.toJSON();
  }

  public async findOne(queryFilter: QueryFilter<TModel>, errorEnabled: boolean = true): Promise<TModel | null> {
    const document = await this.model.findOne(queryFilter).lean<TModel>(true);

    if (!document) {
      this.logger.warn('Document was not found with such queryFilter', queryFilter);
      if (errorEnabled) throw new NotFoundException('Document was not found');
    }

    return document;
  }

  public async updateOne(queryFilter: QueryFilter<TModel>, data: UpdateQuery<TModel>): Promise<TModel> {
    const existingDocument = await this.findOne({ ...queryFilter });

    await this.model.updateOne({ ...queryFilter }, { ...data });

    return {
      ...(existingDocument as TModel),
      ...data,
    };
  }

  public async findMany(queryFilter: QueryFilter<TModel>): Promise<TModel[]> {
    return this.model.find({ ...queryFilter }).lean<TModel[]>(true);
  }

  public async deleteOne(queryFilter: QueryFilter<TModel>): Promise<TModel> {
    const existingDocument = await this.findOne({ ...queryFilter });

    await this.model.deleteOne({ ...queryFilter });

    return { ...(existingDocument as TModel) };
  }
}