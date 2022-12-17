import {UserSaysSomethingEvent, UserSaysSomethingWired} from '.';
import {Stack} from '../wired';

describe('user says something wired', () => {
  it('should trigger wireds when user says something', async () => {
    const wiredFn = jest.fn().mockReturnValueOnce(Promise.resolve(true));
    const stack = new Stack([
      {
        type: 'unknown',
        execute: wiredFn,
        lastExecution: undefined,
      },
    ]);
    const wired = new UserSaysSomethingWired('hello', stack);
    const event = new UserSaysSomethingEvent('Clepsidra', 'hello');
    expect(await wired.trigger(event));
    expect(wiredFn).toHaveBeenCalled();
  });
  it('should not trigger when user says something but username doesnt match', async () => {
    const wiredFn = jest.fn().mockReturnValueOnce(Promise.resolve(true));
    const stack = new Stack([
      {
        type: 'unknown',
        execute: wiredFn,
        lastExecution: undefined,
      },
    ]);
    const wired = new UserSaysSomethingWired('hello', stack, 'lapsed');
    const event = new UserSaysSomethingEvent('Clepsidra', 'hello');
    expect(await wired.trigger(event));
    expect(wiredFn).not.toHaveBeenCalled();
  });
  it('should not trigger when user says something wrong', async () => {
    const wiredFn = jest.fn().mockReturnValueOnce(Promise.resolve(true));
    const stack = new Stack([
      {
        type: 'unknown',
        execute: wiredFn,
        lastExecution: undefined,
      },
    ]);
    const wired = new UserSaysSomethingWired('hello', stack);
    const event = new UserSaysSomethingEvent('Clepsidra', 'hi');
    expect(await wired.trigger(event));
    expect(wiredFn).not.toHaveBeenCalled();
  });
});
