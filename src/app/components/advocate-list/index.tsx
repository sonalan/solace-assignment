import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import SearchForm from './search-form';
import Advocate from '@/types/advocate';
import ListTable from './list-table';
import Pager from '../pager';
import Loader from '../loader';
import PageSizer from '../page-sizer';


function AdvocateList() {
    // Memoize default values to prevent re-calculation
    const { defaultPage, defaultPageSize } = useMemo(() => ({
        defaultPage: Number(process.env.DEFAULT_PAGE) || 1,
        defaultPageSize: Number(process.env.DEFAULT_PAGE_SIZE) || 10
    }), []);
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(defaultPage);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [hasNext, setHasNext] = useState(false)
    const [hasPrev, setHasPrev] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Memoize page options to prevent re-creation
    const pageOptions = useMemo(() => [5, 10, 25, 50, 100], []);
    
    // Ref to track the current request
    const abortControllerRef = useRef<AbortController | null>(null);
    
    const doSearch = useCallback(async () => {
        console.log("searching advocates...");
        
        // Cancel previous request if it exists
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        
        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();
        
        setIsLoading(true);
        
        try {
            const response = await fetch(
                `/api/advocates?page_size=${pageSize}&page=${page}&search_term=${encodeURIComponent(searchTerm)}`,
                { signal: abortControllerRef.current.signal }
            );
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const jsonResponse = await response.json();
            
            setFilteredAdvocates(jsonResponse.data);
            if (jsonResponse.pagination) {
                setTotalPages(jsonResponse.pagination.totalPages);
                setTotalCount(jsonResponse.pagination.totalCount);
                setHasNext(jsonResponse.pagination.hasNext);
                setHasPrev(jsonResponse.pagination.hasPrev);
            }
        } catch (error) {
            if (error instanceof Error && error.name !== 'AbortError') {
                console.error('Search failed:', error);
            }
        } finally {
            setIsLoading(false);
        }
    }, [page, searchTerm, pageSize]);
    
    useEffect(() => {
        console.log("fetching advocates...");
        doSearch();
        
        // Cleanup function to abort request on unmount
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [doSearch]);

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
          <PageSizer pageOptions={pageOptions} selectedOption={pageSize} onChangePageSize={onChangePageSize} />
        </div>
        <Pager totalPages={totalPages} page={page} pageSize={pageSize} totalCount={totalCount} goToPage={goToPage} hasNext={hasNext} hasPrev={hasPrev} />
    </>
  );
}

export default AdvocateList;