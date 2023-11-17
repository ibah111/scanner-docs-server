import { SetMetadata } from '@nestjs/common';
import { CanHandler } from './CanHandler.interface';

export const CHECK_POLICIES_KEY = 'check_can';
export const CheckCan = (...handlers: CanHandler[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
