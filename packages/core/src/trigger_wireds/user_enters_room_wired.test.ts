import {UserEntersRoomEvent, UserEntersRoomWired} from '.';
import {Stack} from '../wired';

describe('user enters room wired', () => {
  it('should trigger wireds when user enters room', async () => {
    const userId = 1337;
    const wiredFn = jest.fn().mockReturnValueOnce(Promise.resolve(true));
    const stack = new Stack([
      {
        type: 'condition',
        execute: jest.fn().mockReturnValueOnce(Promise.resolve(true)),
        lastExecution: undefined,
      },
      {
        type: 'unknown',
        execute: wiredFn,
        lastExecution: undefined,
      },
    ]);
    const wired = new UserEntersRoomWired(stack);
    const event = new UserEntersRoomEvent(userId);
    expect(await wired.trigger(event));
    expect(wiredFn).toHaveBeenCalled();
  });
});
