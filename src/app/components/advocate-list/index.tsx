import React, { useEffect, useState } from 'react';
import SearchForm from './search-form';
import Advocate from '@/types/advocate';
import ListTable from './list-table';
import Pager from '../pager';


function AdvocateList() {
    // const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    
    useEffect(() => {
        console.log("fetching advocates...");
        doSearch()
    }, [page, searchTerm, pageSize]);

    const doSearch = ()=>{
      console.log("searching advocates...");
      //console.log(`page_size=${pageSize}&page=${page}&search_term=${encodeURIComponent(searchTerm)}`)
      fetch(`/api/advocates?page_size=${pageSize}&page=${page}&search_term=${encodeURIComponent(searchTerm)}`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setFilteredAdvocates(jsonResponse.data);
                if (jsonResponse.pagination) {
              
                setTotalPages(jsonResponse.pagination.totalPages);
                //setPage(jsonResponse.pagination.page)
                setTotalCount(jsonResponse.pagination.totalCount)
                setHasNext(jsonResponse.pagination.hasNext)
                setHasPrev(jsonResponse.pagination.hasPrev)
                //setCurrentPage(jsonResponse.pagination.page)
              }
            });
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        setPage(1)

        console.log("filtering advocates...");
    };

    const onReset = () => {
      //console.log(advocates);
      setSearchTerm('');
      setPageSize(2)
      setPage(10)
      setPage(1)
      setTotalCount(0)
      setHasNext(false)
      setHasPrev(false)
      doSearch()
    };

    const goToPage = (p: number)=>{
      console.log(p)
      setPage(p)
    }

  return (
    <>
        <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onReset={onReset} />
        <Pager totalPages={totalPages} page={page} totalCount={totalCount} goToPage={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
        <ListTable advocateList={filteredAdvocates} />
        <Pager totalPages={totalPages} page={page} totalCount={totalCount} goToPage={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
    </>
  );
}

export default AdvocateList;