import { action, makeObservable, observable } from 'mobx'

export class CommonAsyncPageStore {
  constructor() {
    makeObservable(this, {
      pageLoading: observable,
      pageErrMessage: observable,

      handleResetPageState: action,
      handleFetchPageDataInit: action,
      handleFetchPageDataSucceed: action,
      handleFetchPageDataFailed: action,
    })
  }

  pageLoading: boolean = false
  pageErrMessage: string = ''

  handleResetPageState = () => {
    this.pageLoading = false
    this.pageErrMessage = ''
  }

  handleFetchPageDataInit = () => {
    this.pageLoading = true
    this.pageErrMessage = ''
  }

  handleFetchPageDataSucceed = () => {
    this.pageLoading = false
  }

  handleFetchPageDataFailed = (errMessage: string) => {
    this.pageLoading = false
    this.pageErrMessage = errMessage
  }
}
