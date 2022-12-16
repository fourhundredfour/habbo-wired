export type WiredType = 'condition' | 'effect' | 'trigger' | 'unknown';

export interface Wired {
  type: WiredType;
  execute(): Promise<boolean>;
}
