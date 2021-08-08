import { action, computed, makeObservable, observable, toJS } from 'mobx'

export class CommonClientSideTableStore<T> {
  constructor() {
    makeObservable(this, {
      tableData: observable,
      plainTableData: computed,
      handleSetTableData: action,
    })
  }

  tableData: T[] = []

  get plainTableData() {
    return toJS(this.tableData)
  }

  handleSetTableData = (data: T[]) => {
    this.tableData = data
  }
}
