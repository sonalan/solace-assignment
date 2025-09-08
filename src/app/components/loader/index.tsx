import React from 'react'

function Loader() {
  return (
    <div className='flex items-center justify-center'>
        <div className="animate-spin h-10 w-10 border-4 border-green-700 rounded-full border-t-transparent"></div>
    </div>
  )
}

export default Loader