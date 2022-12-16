import {isConditionalWired, Stack, Wired} from '.';

describe('stack', () => {
  let stack: Stack;
  beforeEach(() => {
    stack = new Stack();
  });

  it('should add a wired to stack', () => {
    stack.push({
      type: 'condition',
      execute: () => Promise.resolve(true),
      lastExecution: new Date(),
    } as Wired);
    expect(stack.hasConditionalWireds()).toBeTruthy();
  });

  it('should remove wired', () => {
    const wired = {
      type: 'condition',
      execute: () => Promise.resolve(true),
    } as Wired;
    stack.push(wired);
    expect(stack.hasConditionalWireds()).toBeTruthy();
    stack.remove(wired);
    expect(stack.hasConditionalWireds()).toBeFalsy();
  });

  it('should execute wireds', () => {
    const firstWired = {
      type: 'unknown',
      execute: jest.fn().mockRejectedValueOnce(Promise.resolve(true)),
      lastExecution: new Date(),
    } as Wired;
    const secondWired = {
      type: 'unknown',
      execute: jest.fn().mockRejectedValueOnce(Promise.resolve(true)),
      lastExecution: new Date(),
    } as Wired;
    stack.push(firstWired);
    stack.push(secondWired);
    stack.execute();
  });

  it('shoudld detect conditional wireds', () => {
    const wired = {
      type: 'condition',
      execute: () => Promise.resolve(true),
    } as Wired;
    stack.push(wired);
    expect(isConditionalWired(wired)).toBeTruthy();
  });

  it('should not execute wireds when conditional wireds falsy', () => {
    const conditionalFn = jest.fn();
    conditionalFn.mockReturnValueOnce(Promise.resolve(false));
    const wired = {
      type: 'condition',
      execute: conditionalFn,
      lastExecution: new Date(),
    } as Wired;
    const randomWired = {
      type: 'unknown',
      execute: () => Promise.resolve(true),
    } as Wired;
    stack.push(wired);
    stack.push(randomWired);
    stack.execute();
  });
});
