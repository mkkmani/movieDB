const Pagination = props => {
  const {currentPage, onChangePage} = props

  return (
    <div className="pagination-container">
      <button
        type="button"
        className="page-btn"
        disabled={currentPage === 1}
        onClick={() => {
          onChangePage(-1)
        }}
      >
        Prev
      </button>
      <span className="page-number">{currentPage}</span>
      <button
        type="button"
        className="page-btn"
        onClick={() => {
          onChangePage(1)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
