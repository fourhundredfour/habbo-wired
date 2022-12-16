import {isConditionalWired, isTriggerWired, Wired, WIRED_COOLDOWN} from '.';

export class Stack {
  constructor(private wireds: Wired[] = []) {}

  push(wired: Wired) {
    this.wireds.push(wired);
  }

  remove(wired: Wired) {
    const index = this.wireds.indexOf(wired);
    if (index !== -1) {
      this.wireds.splice(index, 1);
    }
  }

  async execute() {
    if (await this.executeConditionalWireds()) {
      this.wireds.forEach(async wired => {
        if (!isTriggerWired(wired) && !this.hasCooldown(wired)) {
          await wired.execute();
        }
      });
    }
  }

  hasCooldown(wired: Wired): boolean {
    if (!wired.lastExecution) {
      return false;
    }
    return (
      wired.lastExecution.getTime() + WIRED_COOLDOWN > new Date().getTime()
    );
  }

  hasConditionalWireds() {
    return this.wireds.some(wired => isConditionalWired(wired));
  }

  async executeConditionalWireds(): Promise<boolean> {
    const results = await Promise.all(
      this.wireds.map(async wired => {
        if (isConditionalWired(wired)) {
          return await wired.execute();
        }
        return true;
      })
    );
    return results.every(result => result === true);
  }
}
