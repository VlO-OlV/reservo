import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserModel } from '../models';

const getCurrentUserByContext = (context: ExecutionContext): UserModel => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);