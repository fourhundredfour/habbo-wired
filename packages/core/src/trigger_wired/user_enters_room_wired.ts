import {TriggerEvent, TriggerWired} from '.';
import {Stack, WiredType} from '../wired';

export class UserEntersRoomEvent implements TriggerEvent {
  constructor(public readonly sender: number) {}
}

export class UserEntersRoomWired implements TriggerWired {
  type: WiredType = 'trigger';
  lastExecutionDate?: Date = undefined;

  constructor(private stack: Stack) {}

  async trigger(event: Event): Promise<void> {
    if (!(event instanceof UserEntersRoomEvent)) {
      return;
    }
    this.lastExecutionDate = new Date();
    await this.stack.execute();
  }

  get lastExecution(): Date | undefined {
    return this.lastExecutionDate;
  }

  async execute(): Promise<boolean> {
    this.lastExecutionDate = new Date();
    return true;
  }
}
