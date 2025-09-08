import React, { useEffect, useState } from 'react';
import SearchForm from './search-form';
import Advocate from '@/types/advocate';
import ListTable from './list-table';
import Pager from '../pager';
import Loader from '../loader';
import PageSizer from '../page-sizer';


function AdvocateList() {
    // const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const defaultPage: number = Number(process.env.DEFAULT_PAGE) || 1
    const defaultPageSize:number =  Number(process.env.DEFAULT_PAGE_SIZE) || 10
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const pageOptions: number[] = [5, 10,25,50,100]
    
    useEffect(() => {
        console.log("fetching advocates...");
        doSearch()
    }, [page, searchTerm, pageSize]);

    const doSearch = ()=>{
      console.log("searching advocates...");
      setIsLoading(true)
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
                setIsLoading(false)
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
      setPageSize(defaultPageSize)
      setPage(defaultPage)
      setTotalCount(0)
      setHasNext(false)
      setHasPrev(false)
      doSearch()
    };

    const goToPage = (p: number)=>{
      console.log(p)
      setPage(p)
    }

    const onChangePageSize = (size: number) =>{
      setPageSize(size);
      setPage(defaultPage);
    }

  return (
    <>
        <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onReset={onReset} />
        <Pager totalPages={totalPages} page={page} pageSize={pageSize} totalCount={totalCount} goToPage={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
        {isLoading ? ( <Loader />) : 
        ( <ListTable advocateList={filteredAdvocates} />)
        }
        <div>
          <PageSizer pageOptions={pageOptions} selectedOption={defaultPageSize} onChangePageSize={onChangePageSize} />
        </div>
        <Pager totalPages={totalPages} page={page} pageSize={pageSize} totalCount={totalCount} goToPage={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
    </>
  );
}

export default AdvocateList;