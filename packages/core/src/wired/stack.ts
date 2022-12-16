import {Wired, WIRED_COOLDOWN} from './wired';

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

  execute() {
    if (this.hasConditionalWireds() && this.executeConditionalWireds()) {
      this.wireds.forEach(async wired => {
        if (!this.isConditionalWired(wired) && !this.hasCooldown(wired)) {
          await wired.execute();
        }
      });
    }
  }

  hasCooldown(wired: Wired): boolean {
    return (
      wired.lastExecution.getTime() + WIRED_COOLDOWN > new Date().getTime()
    );
  }

  hasConditionalWireds() {
    return this.wireds.some(wired => this.isConditionalWired(wired));
  }

  isConditionalWired(wired: Wired): boolean {
    return wired.type === 'condition';
  }

  executeConditionalWireds(): boolean {
    return this.wireds.every(async wired => {
      if (this.isConditionalWired(wired)) {
        return await wired.execute();
      }
      return true;
    });
  }
}
