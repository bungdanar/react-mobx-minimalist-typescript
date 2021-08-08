import { action, makeObservable, observable } from 'mobx'

export class CommonAsyncPageStore {
  constructor() {
    makeObservable(this, {
      loading: observable,
      errMessage: observable,

      handleResetState: action,
      handleFetchInit: action,
      handleFetchSucceed: action,
      handleFetchFailed: action,
    })
  }

  loading: boolean = false
  errMessage: string = ''

  handleResetState = () => {
    this.loading = false
    this.errMessage = ''
  }

  handleFetchInit = () => {
    this.loading = true
    this.errMessage = ''
  }

  handleFetchSucceed = () => {
    this.loading = false
  }

  handleFetchFailed = (errMessage: string) => {
    this.loading = false
    this.errMessage = errMessage
  }
}
