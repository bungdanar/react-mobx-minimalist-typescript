import styles from './DefaultColumnFilter.module.css'

const DefaultColumnFilter = ({ column: { filterValue, setFilter } }: any) => {
  return (
    <div className={styles.defaultColumnFilter}>
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
        className="form-control"
      />
    </div>
  )
}

export default DefaultColumnFilter
