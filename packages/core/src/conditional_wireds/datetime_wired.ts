import {Wired, WiredType} from '../wired';

export class DateTimeWired implements Wired {
  type: WiredType = 'condition';
  lastExecutionDate?: Date = undefined;

  constructor(private startDate: Date, private stopDate: Date) {}

  get lastExecution(): Date | undefined {
    return this.lastExecutionDate;
  }

  async execute(): Promise<boolean> {
    const now = new Date();
    this.lastExecutionDate = now;
    return now >= this.startDate && now <= this.stopDate;
  }
}
