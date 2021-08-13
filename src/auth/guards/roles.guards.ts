import { Injectable, CanActivate, ExecutionContext, Get } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enums/roles.enum';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GetUser } from '../decorators/user.decorator';
import { User } from 'src/users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.req.userId;
    console.log('------------------', ctx.req.userId);

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    //const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.includes(user.role.name);
    return false;
  }
}
