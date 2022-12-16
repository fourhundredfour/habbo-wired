import {Wired} from '.';

export function isTriggerWired(wired: Wired): boolean {
  return wired.type === 'trigger';
}

export function isConditionalWired(wired: Wired): boolean {
  return wired.type === 'condition';
}
