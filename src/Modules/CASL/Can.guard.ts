import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility, CaslAbilityFactory } from './Casl.ability.factory';
import { CanHandler } from './CanHandler.interface';
import { CHECK_POLICIES_KEY } from './Can.decorators';
import { AuthResult } from '../Guards/auth.guard';

@Injectable()
export class CanGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  private execPolicyHandler(handler: CanHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }

  canActivate(context: ExecutionContext): boolean {
    const handlers = this.reflector.get<CanHandler[] | null>(
      CHECK_POLICIES_KEY,
      context.getHandler(),
    );

    if (!handlers) return true;
    const body = context.switchToHttp().getRequest<{
      user: AuthResult;
    }>();
    const userL = body.user.userLocal;
    const ability = this.caslAbilityFactory.createForUser(userL);
    return handlers?.every((handlers) => {
      return this.execPolicyHandler(handlers, ability);
    });
  }
}
