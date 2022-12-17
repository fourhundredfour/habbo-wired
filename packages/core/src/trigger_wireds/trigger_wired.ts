import {Wired} from '../wired';

export interface TriggerWired extends Wired {
  trigger(event: Event): Promise<void>;
}
