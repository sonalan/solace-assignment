import React from 'react'

type pageSizerProps = {
    pageOptions: number[];
    selectedOption: number;
    onChangePageSize: (size: number) => void;
}

function PageSizer({pageOptions, selectedOption, onChangePageSize}: pageSizerProps) {
  return (
    
    <div className='flex items-center justify-items-end mt-3'>
        <span className='mr-5'>Page Size:</span>
        <select 
            onChange={(e) => onChangePageSize(Number(e.target.value))}
            value={selectedOption}
            className="w-24 h-10 px-3 py-2 text-sm bg-white text-green-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700 hover:border-gray-400 transition-colors"
        >
            {pageOptions.map((o) => (
                <option 
                    key={o} 
                    value={o} 
                >{o}</option>
            ))}
        </select>
    </div>
  )
}

export default PageSizer
