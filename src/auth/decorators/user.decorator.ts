import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

// used by @CurrentUser()
export const CurrentUser = createParamDecorator(
  (data, context: GqlExecutionContext) => {
    const ctx = context.switchToHttp().getRequest();
    return ctx.user;
  },
);
