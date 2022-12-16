import {DateTimeWired} from './datetime_wired';

describe('datetime wired', () => {
  it('should return true when current date is between two dates', async () => {
    const startDate = new Date();
    const stopDate = new Date();
    stopDate.setDate(new Date().getDate() + 1);
    startDate.setDate(new Date().getDate() - 1);
    const wired = new DateTimeWired(startDate, stopDate);
    expect(await wired.execute()).toBeTruthy();
  });
  it('should return false when current date is not between two dates', async () => {
    const startDate = new Date();
    const stopDate = new Date();
    stopDate.setDate(new Date().getDate() + 1);
    startDate.setDate(new Date().getDate() + 2);
    const wired = new DateTimeWired(startDate, stopDate);
    expect(await wired.execute()).toBeFalsy();
  });
});
