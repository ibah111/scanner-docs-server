import { AppAbility } from './Casl.ability.factory';

interface ICanHandler {
  handle(ability: AppAbility): boolean;
}

type CanHandlerCallback = (ability: AppAbility) => boolean;

export type CanHandler = ICanHandler | CanHandlerCallback;
