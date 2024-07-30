import React, { ChangeEvent } from 'react';
import { FormControlLabel, Checkbox, withStyles } from '@material-ui/core';
import { ClassNameMap } from '@material-ui/core/styles/withStyles';

// Define styles for the custom Checkbox
const styles = {
  root: {
    color: '#fff', // Default color when unchecked
    '&$checked': {
      color: '#f0d407', // Yellowish color when checked
    },
  },
  checked: {},
};

// Define interface for styles props
interface CheckboxProps {
  classes: ClassNameMap<"root" | "checked">;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

// Custom Checkbox component with styles
const YellowCheckbox = withStyles(styles)(({ classes, checked, onChange, value }: CheckboxProps) => (
  <Checkbox
    classes={{
      root: classes.root,
      checked: classes.checked,
    }}
    checked={checked}
    onChange={onChange}
    value={value}
    color="default" // Use 'default' color to enable the custom styling
  />
));

// Define your component
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
    <div className='mt-2 ml-1 space-y-1 font-Montserrat'>
      <div>
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={city}
              onChange={onCheckboxChange}
              value="city"
            />
          }
          label="Search with city"
    
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={airport}
              onChange={onCheckboxChange}
              value="airport"
            />
          }
          label="Search with Airport"
        
        />
      </div>
    </div>
  );
}

export default SearchCheckboxes;
