import React from 'react'

type PagerProps = {
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  goToPage: (p:number) => void;
};

const Pager: React.FC<PagerProps> = ({
  page,
  totalPages,
  hasNext,
  hasPrev,
  goToPage,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 p-4">
      <button
        onClick={() => goToPage(page-1)}
        disabled={!hasPrev}
        className="px-4 py-2 pager-button text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:hover:bg-gray-300"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Page</span>
        <span className="font-semibold">{page}</span>
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
    </div>
  )
}

export default Pager