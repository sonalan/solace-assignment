import React from 'react'

type PagerProps = {
  page: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (p:number) => void;
};

const Pager: React.FC<PagerProps> = ({
  page,
  totalPages,
  totalCount,
  hasNext,
  hasPrev,
  goToPage,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        onClick={() => goToPage(1)}
        disabled={page===1}
        className="px-4 py-2 pager-button text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:hover:bg-gray-300"
      >
        {"<<"}
      </button>
      <button
        onClick={() => goToPage(page-1)}
        disabled={!hasPrev}
        className="px-4 py-2 pager-button text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:hover:bg-gray-300"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Total result</span>
        <span className="font-semibold">{totalCount} </span>
        <span className="text-sm text-gray-600"> Showing</span>
        <span className="font-semibold">{page}</span>
        <span className="text-sm text-gray-600">Page</span>
        <span className="text-sm text-gray-600">of</span>
        <span className="font-semibold">{totalPages}</span>
      </div>
      
      <button
        onClick={() => goToPage(page+1)}
        disabled={!hasNext}
        className="px-4 py-2 pager-button text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:hover:bg-gray-300"
      >
        Next
      </button>
      <button
        onClick={() => goToPage(totalPages)}
        disabled={page===totalPages}
        className="px-4 py-2 pager-button text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:hover:bg-gray-300"
      >
        {">>"}
      </button>
    </div>
  )
}

export default Pager
