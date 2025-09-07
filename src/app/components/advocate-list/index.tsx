import React, { useEffect, useState } from 'react';
import SearchForm from './search-form';
import Advocate from '@/types/advocate';
import ListTable from './list-table';


function AdvocateList() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

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
        setSearchTerm(e.target.value)

        console.log("filtering advocates...");
        const filteredAdvocates = advocates.filter((advocate) => {
        return (
            advocate.firstName.includes(searchTerm) ||
            advocate.lastName.includes(searchTerm) ||
            advocate.city.includes(searchTerm) ||
            advocate.degree.includes(searchTerm) ||
            advocate.specialties.includes(searchTerm) ||
            advocate.yearsOfExperience.toString().includes(searchTerm)
        );
        });

        setFilteredAdvocates(filteredAdvocates);
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