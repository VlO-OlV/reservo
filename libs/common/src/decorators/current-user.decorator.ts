import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../models';

const getCurrentUserByContext = (context: ExecutionContext): UserEntity | undefined => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  const user = context.getArgs()[2]?.req.headers?.user;
  if (user) {
    return JSON.parse(user);
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);