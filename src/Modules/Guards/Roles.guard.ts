import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/Services/Users/Users.service';
import { AuthResult } from './auth.guard';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const data = ctx.switchToHttp().getRequest();
    const roles = this.reflector.get<{
      roles: string | string[];
      and: boolean;
    }>('roles', ctx.getHandler());
    const user = data.user as AuthResult;
    const groups = await this.usersService.group(
      user.userLocal?.login as string,
    );
    data.roles = groups;
    if (roles) {
      if (typeof roles.roles === 'string') {
        if (groups.includes(roles.roles)) {
          return true;
        } else {
          throw new ForbiddenException({
            Result: 'error',
            Code: '403',
            Message: 'У вас нет прав',
          });
        }
      }
      if (Array.isArray(roles.roles)) {
        if (!roles.and) {
          for (const role of roles.roles) {
            if (groups.includes(role)) return true;
          }
        } else {
          const count = roles.roles.length;
          let result = 0;
          for (const role of roles.roles)
            if (groups.includes(role)) result += 1;
          if (result == count) return true;
        }
      }
      throw new ForbiddenException({
        Result: 'error',
        Code: '403',
        Message: 'У вас нет прав',
      });
    }
    return true;
  }
}
export const Roles = (roles: string | string[], and = false) =>
  SetMetadata('roles', { roles, and });

export const Role = createParamDecorator(
  async (_data: string, ctx: ExecutionContext) => {
    const data = ctx.switchToHttp().getRequest();
    if (data.roles) {
      const result: string[] = data.roles;
      return result;
    }
    throw new ForbiddenException({
      Result: 'error',
      Code: '403',
      Message: 'У вас нет прав',
    });
  },
);
export type RoleSuccess = string[];
