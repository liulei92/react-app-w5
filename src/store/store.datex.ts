import { observable, action, makeObservable, computed, autorun } from "mobx";

class Datex {
  constructor() {
    makeObservable(this);
  }

  @observable
  timestamp = new Date().getTime();

  @computed
  get timeString() {
    return new Date(this.timestamp).toLocaleTimeString();
  }

  @action.bound
  updateTimestamp() {
    this.timestamp = new Date().getTime();
  }
}

const datex = new Datex();

autorun(() => {
  console.log("timeStamp: " + datex.timestamp);
});

export default datex;
