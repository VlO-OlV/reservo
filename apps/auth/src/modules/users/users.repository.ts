import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserModel } from "./models/user.schema";

@Injectable()
export class UsersRepository extends AbstractRepository<UserModel> {
  protected readonly logger = new Logger(UsersRepository.name);

  public constructor(
    @InjectModel(UserModel.name) userModel: Model<UserModel>,
  ) {
    super(userModel);
  }
}