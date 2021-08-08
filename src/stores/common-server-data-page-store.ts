import { action, makeObservable, observable } from 'mobx'

export class CommonServerDataPageStore {
  constructor() {
    makeObservable(this, {
      pageLoading: observable,
      pageErrMessage: observable,
    })
  }

  pageLoading: boolean = false
  pageErrMessage: string = ''

  // Non-annotated instance fields are overridable
  handleResetPageState = action(() => {
    this.pageLoading = false
    this.pageErrMessage = ''
  })

  // Non-annotated instance fields are overridable
  handleFetchPageDataInit = action(() => {
    this.pageLoading = true
    this.pageErrMessage = ''
  })

  // Non-annotated instance fields are overridable
  handleFetchPageDataSucceed = action(() => {
    this.pageLoading = false
  })

  // Non-annotated instance fields are overridable
  handleFetchPageDataFailed = action((errMessage: string) => {
    this.pageLoading = false
    this.pageErrMessage = errMessage
  })
}
