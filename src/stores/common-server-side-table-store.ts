import { action, computed, makeObservable, observable, toJS } from 'mobx'

export class CommonServerSideTableStore<T> {
  constructor() {
    makeObservable(this, {
      tableData: observable,
      tableLoading: observable,
      tableErrMessage: observable,
      tablePageCount: observable,
      tableRowCount: observable,

      plainTableData: computed,

      handleSetTableData: action,
      handleResetTableState: action,
      handleFetchTableDataInit: action,
      handleFetchTableDataSucceed: action,
      handleFetchTableDataFailed: action,
    })
  }

  tableData: T[] = []
  tableLoading: boolean = false
  tableErrMessage: string = ''
  tablePageCount: number = 0
  tableRowCount: number = 0

  get plainTableData() {
    return toJS(this.tableData)
  }

  handleSetTableData = (data: T[]) => {
    this.tableData = data
  }

  handleResetTableState = () => {
    this.tableData = []
    this.tableLoading = false
    this.tableErrMessage = ''
    this.tablePageCount = 0
    this.tableRowCount = 0
  }

  handleFetchTableDataInit = () => {
    this.tableLoading = true
    this.tableErrMessage = ''
  }

  handleFetchTableDataSucceed = ({
    data,
    pageCount,
    rowCount,
  }: {
    data: T[]
    pageCount: number
    rowCount: number
  }) => {
    this.tableLoading = false
    this.tableData = data
    this.tablePageCount = pageCount
    this.tableRowCount = rowCount
  }

  handleFetchTableDataFailed = (errMessage: string) => {
    this.tableLoading = false
    this.tableErrMessage = errMessage
    this.tableData = []
    this.tablePageCount = 0
    this.tableRowCount = 0
  }
}
