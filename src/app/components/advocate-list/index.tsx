import React, { useEffect, useState } from 'react';
import SearchForm from './search-form';
import Advocate from '@/types/advocate';
import ListTable from './list-table';


function AdvocateList() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        console.log("fetching advocates...");
        fetch("/api/advocates").then((response) => {
          response.json().then((jsonResponse) => {
            setAdvocates(jsonResponse.data);
            setFilteredAdvocates(jsonResponse.data);
          });
        });
    }, []);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        console.log("filtering advocates...");
        fetch(`/api/advocates?page_size={pageSize}0&page={page}&search_term=${encodeURIComponent(newSearchTerm)}`)
            .then((response) => response.json())
            .then((jsonResponse) => {
                setFilteredAdvocates(jsonResponse.data);
            });
    };

  const onReset = () => {
    console.log(advocates);
    setSearchTerm('');
    setFilteredAdvocates(advocates);
  };

  return (
    <>
        <SearchForm searchTerm={searchTerm} onSearchChange={onSearchChange} onReset={onReset} />
        <ListTable advocateList={filteredAdvocates} />
    </>
  );
}

export default AdvocateList;