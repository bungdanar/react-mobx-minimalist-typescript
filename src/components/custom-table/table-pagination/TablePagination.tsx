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
    <div className={styles.tablePagination}>
      <div className={styles.verticalCenterText}>
        Page {pageIndex + 1} of {pageOptions.length}
      </div>
      <div className={styles.paginationSection}>
        <div className='input-group'>
          <div className={styles.verticalCenterText}>
            <span>Go to Page</span>
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
        <div>
          <button
            className={['btn', styles.btnPagination].join(' ')}
            onClick={previousPage}
            disabled={!canPreviousPage || isLoading}
          >
            Previous
          </button>
        </div>
        <div>
          <button
            className={['btn', styles.btnPagination].join(' ')}
            onClick={nextPage}
            disabled={!canNextPage || isLoading}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
