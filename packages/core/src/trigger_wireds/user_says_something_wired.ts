import {TriggerWired} from '.';
import {Stack, WiredType} from '../wired';

export class UserSaysSomethingEvent implements Event {
  constructor(public username: string, public message: string) {}
}

export class UserSaysSomethingWired implements TriggerWired {
  type: WiredType = 'trigger';
  lastExecutionDate?: Date;

  constructor(
    private message: string,
    private readonly stack: Stack,
    private readonly username?: string
  ) {}

  async trigger(event: Event): Promise<void> {
    if (!(event instanceof UserSaysSomethingEvent)) {
      return;
    }
    if (this.username && event.username !== this.username) {
      return;
    }
    const regex = new RegExp(this.message);
    if (!regex.test(event.message)) {
      return;
    }
    this.lastExecutionDate = new Date();
    return this.stack.execute();
  }

  async execute(): Promise<boolean> {
    this.lastExecutionDate = new Date();
    return true;
  }

  get lastExecution(): Date | undefined {
    return this.lastExecutionDate;
  }
}
