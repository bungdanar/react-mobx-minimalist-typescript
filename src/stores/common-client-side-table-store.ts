import { action, computed, makeObservable, observable, toJS } from 'mobx'

export class CommonClientSideTableStore<T> {
  constructor() {
    makeObservable(this, {
      data: observable,
      plainData: computed,
      setData: action,
    })
  }

  data: T[] = []

  get plainData() {
    return toJS(this.data)
  }

  setData = (data: T[]) => {
    this.data = data
  }
}
