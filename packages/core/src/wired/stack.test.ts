import {Stack, Wired} from '.';

describe('stack', () => {
  let stack: Stack;
  beforeEach(() => {
    stack = new Stack();
  });

  it('should add a wired to stack', () => {
    stack.push({
      type: 'condition',
      execute: () => Promise.resolve(true),
      lastExecution: undefined,
    } as Wired);
    expect(stack.hasConditionalWireds()).toBeTruthy();
  });

  it('should remove wired', () => {
    const wired = {
      type: 'condition',
      execute: () => Promise.resolve(true),
      lastExecution: undefined,
    } as Wired;
    stack.push(wired);
    expect(stack.hasConditionalWireds()).toBeTruthy();
    stack.remove(wired);
    expect(stack.hasConditionalWireds()).toBeFalsy();
  });

  it('should execute wireds', async () => {
    const wiredFn = jest.fn().mockReturnValue(Promise.resolve(true));
    const firstWired = {
      type: 'unknown',
      execute: wiredFn,
      lastExecution: undefined,
    } as Wired;
    const secondWired = {
      type: 'unknown',
      execute: wiredFn,
      lastExecution: undefined,
    } as Wired;
    stack.push(firstWired);
    stack.push(secondWired);
    await stack.execute();
    expect(wiredFn).toHaveBeenCalledTimes(2);
  });

  it('should not execute wireds when conditional wireds falsy', async () => {
    const randomWiredFn = jest.fn();
    randomWiredFn.mockReturnValueOnce(Promise.resolve(true));
    const wired = {
      type: 'condition',
      execute: () => Promise.resolve(false),
      lastExecution: undefined,
    } as Wired;
    const randomWired = {
      type: 'unknown',
      execute: randomWiredFn,
      lastExecution: undefined,
    } as Wired;
    stack.push(wired);
    stack.push(randomWired);
    await stack.execute();
    expect(randomWiredFn).not.toHaveBeenCalled();
  });
});
