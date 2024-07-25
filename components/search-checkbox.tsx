import React, { ChangeEvent } from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';

interface SearchState {
  keyword: string;
  city: boolean;
  airport: boolean;
  page: number;
}

interface SearchCheckboxesProps {
  search: SearchState;
  setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
}

const SearchCheckboxes: React.FC<SearchCheckboxesProps> = ({ search, setSearch }) => {
  const { city, airport } = search;

  // Handle change event on clicking checkboxes
  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { checked, value } = e.target;

    setSearch((prevSearch) => ({
      ...prevSearch,
      [value]: checked
    }));
  };

  return (
    <div className='mt-4 space-x-6 ml-12'>
      <FormControlLabel
        control={
          <Checkbox
            checked={city}
            onChange={onCheckboxChange}
            value="city"
          />
        }
        label="City"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={airport}
            onChange={onCheckboxChange}
            value="airport"
          />
        }
        label="Airport"
      />
    </div>
  );
}

export default SearchCheckboxes;
