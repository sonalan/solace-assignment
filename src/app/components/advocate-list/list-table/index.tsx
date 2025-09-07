import Advocate from '@/types/advocate';
import React from 'react'

interface ListTableProps {
  advocateList: Advocate[];
}

function ListTable({advocateList}:ListTableProps ) {
  return (
    <>
      <table className='w-full text-left table-auto min-w-max'>
        <thead>
          <tr className='bg-gray-100 text-gray-700 '>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>First Name</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>Last Name</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>City</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>Degree</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>Specialties</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>Years of Experience</th>
            <th className='p-4 border-b border-slate-300 bg-slate-50'>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocateList.map((advocate) => {
            return (
              <tr key={advocate.id} className='hover:bg-slate-50'>
                <td className='p-4 border-b border-slate-200'>{advocate.firstName}</td>
                <td className='p-4 border-b border-slate-200'>{advocate.lastName}</td>
                <td className='p-4 border-b border-slate-200'>{advocate.city}</td>
                <td className='p-4 border-b border-slate-200'>{advocate.degree}</td>
                <td className='p-4 border-b border-slate-200'>
                  {advocate.specialties.map((s) => (
                    <div key={s}>{s}</div>
                  ))}
                </td>
                <td className='p-4 border-b border-slate-200'>{advocate.yearsOfExperience}</td>
                <td className='p-4 border-b border-slate-200'>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default ListTable;