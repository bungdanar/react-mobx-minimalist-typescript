import { action, computed, makeObservable, observable, toJS } from 'mobx'

export class CommonServerSideTableStore<T> {
  constructor() {
    makeObservable(this, {
      data: observable,
      loading: observable,
      errMessage: observable,
      pageCount: observable,
      rowCount: observable,

      plainData: computed,

      setData: action,
      handleResetState: action,
      handleFetchInit: action,
      handleFetchSucceed: action,
      handleFetchFailed: action,
    })
  }

  data: T[] = []
  loading: boolean = false
  errMessage: string = ''
  pageCount: number = 0
  rowCount: number = 0

  get plainData() {
    return toJS(this.data)
  }

  setData = (data: T[]) => {
    this.data = data
  }

  handleResetState = () => {
    this.data = []
    this.loading = false
    this.errMessage = ''
    this.pageCount = 0
    this.rowCount = 0
  }

  handleFetchInit = () => {
    this.loading = true
    this.errMessage = ''
  }

  handleFetchSucceed = ({
    data,
    pageCount,
    rowCount,
  }: {
    data: T[]
    pageCount: number
    rowCount: number
  }) => {
    this.loading = false
    this.data = data
    this.pageCount = pageCount
    this.rowCount = rowCount
  }

  handleFetchFailed = (errMessage: string) => {
    this.loading = false
    this.errMessage = errMessage
    this.data = []
    this.pageCount = 0
    this.rowCount = 0
  }
}
