import {Wired, WiredType} from '../wired';

export class DateTimeWired implements Wired {
  type: WiredType = 'condition';
  lastExecutionDate: Date = new Date();

  constructor(private startDate: Date, private stopDate: Date) {}

  get lastExecution(): Date {
    return this.lastExecutionDate;
  }

  async execute(): Promise<boolean> {
    const now = new Date();
    this.lastExecutionDate = now;
    return now >= this.startDate && now <= this.stopDate;
  }
}
