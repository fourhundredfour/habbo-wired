import {TriggerEvent, TriggerWired} from '.';
import {Stack, WiredType} from '../wired';

export type UserEntersRoomEvent = TriggerEvent;

export class UserEntersRoomWired implements TriggerWired {
  type: WiredType = 'trigger';
  lastExecutionDate: Date = new Date();

  constructor(private stack: Stack) {}

  trigger(): void {
    this.stack.execute();
  }

  get lastExecution(): Date {
    return this.lastExecutionDate;
  }

  async execute(): Promise<boolean> {
    this.lastExecutionDate = new Date();
    return true;
  }
}
