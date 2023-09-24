import React, { useState, useEffect, useRef } from 'react'
import VacanciesSearchHeader from '../../entities/headers/VacanciesSearchHeader/VacanciesSearchHeader'
import SearchField from '../../shared/components/SearchField/SearchField'
import VacanciesFilter from '../../entities/VacanciesFilter/VacanciesFilter'
import useStyles from './VacancyFeed.styles'
import VacanciesList from '../../features/VacanciesList/VacanciesList'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const VacancyFeed = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const [occupationFilter, setOccupationFilter] = useState(state?.filters?.occupationFilter || 'no-matter');
  const [countryFilter, setCountryFilter] = useState(state?.filters?.countryFilter || 'no-matter');
  const [specializationFilter, setSpecializationFilter] = useState(state?.filters?.specializationFilter || 'no-matter');
  const [gradeFilter, setGradeFilter] = useState(state?.filters?.gradeFilter || []);
  const [searchText, setSearchText] = useState(state?.searchText || '');
  const [page, setPage] = useState(state?.page || 1);
  const [searchResults, setSearchResults] = useState(state?.searchResults || []);
  const loadMoreRef = useRef(null);
  const [searchFieldCounter, setSearchFieldCounter] = useState(true);
  const [searchTextChanged, setSearchTextChanged] = useState(false);
  const [searchTotal, setSearchTotal] = useState();
  const vacancyListRef = useRef(null);
  // console.log(' page', page);
  // console.log('searchResults', searchResults)
  const baseURL = process.env.REACT_APP_MODE === "production"
  ? "https://gagasearch.com/api" 
  : "http://127.0.0.1:5500/api";
  useEffect(() => {
      window.scrollTo(0, state?.currentScrollY);
  }, [searchFieldCounter]);
  useEffect(() => {
    if (searchTextChanged) {
      setPage(1);
      setSearchResults([]);
      if (vacancyListRef.current) {
        const topPosition = vacancyListRef.current.getBoundingClientRect().top;
        window.scrollBy({ top: topPosition - 75, behavior: 'smooth' }); // 100 - это примерное значение отступа, его можно настроить по вашему усмотрению
      }
      setSearchTextChanged(false);
    }
}, [searchFieldCounter]);


  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const params = {
          count: 50,
          offset: (page - 1) * 50 || 0,
          // offset: 0,
      };
      if (searchText && searchText.trim() !== "") {
        params.text = searchText;
      }
      if (occupationFilter && occupationFilter !== 'no-matter') {
        params.occupationType = occupationFilter;
      }
      if (countryFilter && countryFilter !== 'no-matter') {
        params.country = countryFilter;
      }
      if (specializationFilter && specializationFilter !== 'no-matter') {
        params.specialization = specializationFilter;
      }
      if (gradeFilter && gradeFilter.length > 0) {
        params.grade = gradeFilter.join(',');
      }
      
      const response = await axios.get(`${baseURL}/vacancies/search`, { params });
        console.log(response);
        const combinedResults = page > 1 
          ? [ ...searchResults, ...response.data.hits.map(item => ({...item._source, highlight: item.highlight}))]
          : [...response.data.hits.map(item => ({...item._source, highlight: item.highlight}))];
        setSearchResults(combinedResults);
        setSearchTotal(response.data.total.value);
      } catch (error) {
        console.error("Ошибка при поиске:", error);
      }
    };
    if (page > searchResults.length / 50) {
      fetchSearchResults();
    }
  }, [searchText, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef]);
  const handleSearchExecute = (newSearchText) => {
    setSearchText(newSearchText);
    setSearchResults([]); // Очистите текущие результаты
    setSearchFieldCounter(!searchFieldCounter);
    setSearchTextChanged(true);
  };
  
  return (
    <>
      <div className={classes.header}>
        <VacanciesSearchHeader />
        <SearchField 
          setSearchTextChanged={setSearchTextChanged}
          searchText={searchText} 
          setSearchText={setSearchText} 
          setSearchFieldCounter={setSearchFieldCounter} 
          searchFieldCounter={searchFieldCounter} 
          handleSearchExecute={handleSearchExecute}
        />
        <VacanciesFilter 
          setOccupationFilter={setOccupationFilter} 
          setCountryFilter={setCountryFilter} 
          setSpecializationFilter={setSpecializationFilter}
          setGradeFilter={setGradeFilter}
          initialFilters={{ occupationFilter, countryFilter, specializationFilter, gradeFilter }}
          setSearchFieldCounter={setSearchFieldCounter} 
          searchFieldCounter={searchFieldCounter} 
          setSearchTextChanged={setSearchTextChanged}
          handleSearchExecute={handleSearchExecute}
        />
        <VacanciesList 
          occupationFilter={occupationFilter} 
          countryFilter={countryFilter} 
          specializationFilter={specializationFilter}
          gradeFilter={gradeFilter}
          searchText={searchText}
          searchResults={searchResults}
          page={page}
          searchTotal={searchTotal}
          ref={vacancyListRef}
        />
      </div>
      <div ref={loadMoreRef} className={classes.loadMoreButton}>
        {/* <button onClick={() => setPage(prevPage => prevPage + 1)}>Загрузить еще</button> */}
      </div>
      <div className={classes.body}>
      </div>
    </>
  )
}


export default VacancyFeed
