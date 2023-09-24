import React, { useState, useEffect } from 'react';
import useStyles from './SearchField.styles';
import SearchIcon from '../../icons/SearchIcon';

const SearchField = ({ setSearchText, searchText, setSearchFieldCounter, searchFieldCounter, setSearchTextChanged, handleSearchExecute }) => {
  const classes = useStyles();
  const [localSearchText, setLocalSearchText] = useState(searchText);
  const executeSearch = () => {
    handleSearchExecute(localSearchText);
  };
  // useEffect(() => {
  //   setSearchText(localSearchText);
  // }, [localSearchText]);

  return (
    <div className={classes.wrapper}>
      <input
        className={classes.searchField}
        placeholder="GAGA поиск"
        value={localSearchText}
        onChange={(e) => setLocalSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            executeSearch();
            e.target.blur(); // Скрывает клавиатуру
          }
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            executeSearch();
            e.target.blur(); // Скрывает клавиатуру
          }
        }}
      />
      <div onClick={executeSearch}>
        <SearchIcon className={classes.searchIcon} />
      </div>
    </div>
  );
};

export default SearchField;
