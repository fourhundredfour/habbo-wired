import {Wired, WiredType} from '../wired/wired';

export class DateTimeWired implements Wired {
  type: WiredType = 'condition';

  constructor(private startDate: Date, private stopDate: Date) {}

  async execute(): Promise<boolean> {
    const now = new Date();
    return now >= this.startDate && now <= this.stopDate;
  }
}
