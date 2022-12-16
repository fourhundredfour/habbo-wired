export type WiredType = 'condition' | 'effect' | 'trigger' | 'unknown';

// miliseconds
export const WIRED_COOLDOWN = 500;

export interface Wired {
  type: WiredType;
  execute(): Promise<boolean>;

  get lastExecution(): Date;
}
