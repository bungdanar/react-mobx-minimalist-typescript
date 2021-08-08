import styles from './TablePagination.module.css'

interface TablePaginationProps {
  canNextPage: boolean
  canPreviousPage: boolean
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void
  nextPage: () => void
  previousPage: () => void
  pageCount: number
  pageIndex: number
  pageOptions: number[]
  isLoading?: boolean
}

export default function TablePagination({
  canNextPage,
  canPreviousPage,
  gotoPage,
  nextPage,
  previousPage,
  pageCount,
  pageIndex,
  pageOptions,
  isLoading = false,
}: TablePaginationProps): JSX.Element {
  return (
    <>
      <div className={['row', styles.tablePagination].join(' ')}>
        <div className='col'>
          <span className='align-middle'>
            Page {pageIndex + 1} of {pageOptions.length}
          </span>
        </div>
        <div className='col'>
          <div className='input-group'>
            <div>
              <span className='align-middle me-2'>Go to Page</span>
            </div>
            <input
              type='number'
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              className={['form-control', styles.goToPageInput].join(' ')}
            />
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <div className='col d-grid'>
              <button
                className='btn btn-primary btn-sm'
                onClick={previousPage}
                disabled={!canPreviousPage || isLoading}
              >
                Previous
              </button>
            </div>
            <div className='col d-grid'>
              <button
                className='btn btn-primary btn-sm'
                onClick={nextPage}
                disabled={!canNextPage || isLoading}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
