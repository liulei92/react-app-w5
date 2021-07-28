import { observable, action, makeObservable } from 'mobx';

class Timer {
  constructor () {
    makeObservable(this);
  }

  @observable
  secondsPassed = 0;

  @action.bound
  increaseTimer () {
    this.secondsPassed += 1;
  }
}

export default new Timer();