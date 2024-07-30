import React, { useState, useCallback, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import axios, { CancelTokenSource } from "axios";
import { getAmadeusData } from "@/app/api/amadues.api";
import { debounce } from "lodash";

// Define the interface for search properties
interface SearchProps {
  airportCode: string;
  setAirportCode: React.Dispatch<React.SetStateAction<string>>;
  search: {
    city: boolean;
    airport: boolean;
  };
  setSearch: React.Dispatch<
    React.SetStateAction<{
      city: boolean;
      airport: boolean;
      keyword: string;
      page: number;
    }>
  >;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

// Define the interface for the option type
interface OptionType {
  type: string;
  name: string;
  airportCode: string;
}

// Custom styling for Material-UI components
const useStyles = makeStyles((theme) => ({
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
      backgroundColor: "white",
      "& fieldset": {
        borderColor: theme.palette.grey[400],
      },
      "&:hover fieldset": {
        borderColor: theme.palette.grey[600],
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  inputBase: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.875rem", // Smaller font size for mobile
      padding: "10px 12px", // Adjust padding for smaller devices
    },
  },
  autoComplete: {
    [theme.breakpoints.down("sm")]: {
      width: "100%", // Full width on mobile
    },
    [theme.breakpoints.up("sm")]: {
      width: "418px", // Default width for larger screens
    },
  },
}));

// Main component definition
const FromSearchAutocomplete: React.FC<SearchProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false); // Manage dropdown open state
  const [options, setOptions] = useState<OptionType[]>([]); // Store options for autocomplete
  const [search, setSearch] = useState<string>(props.value); // Manage search text
  const [keyword, setKeyword] = useState<string>(props.value); // Track keyword for search
  const [loading, setLoading] = useState<boolean>(false); // Loading state for fetching data

  // Debounce function to control the frequency of data fetching
  const debounceLoadData = useCallback(
    debounce((value: string) => {
      setKeyword(value);
    }, 1000),
    []
  );

  // Effect to trigger debounced data loading
  useEffect(() => {
    debounceLoadData(search);
  }, [search, debounceLoadData]);

  // Effect to fetch data from the Amadeus API
  useEffect(() => {
    setLoading(true);
    let source: CancelTokenSource | undefined = undefined;

    const fetchData = async () => {
      try {
        const { out, source: cancelSource } = getAmadeusData({
          ...props.search,
          keyword,
        });
        source = cancelSource;

        const res = await out;

        if (!res.data.code) {
          setOptions(
            res.data.data.map((i: any) => ({
              type: i.subType,
              name: i.name,
              airportCode: i.iataCode,
            }))
          );
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.error("Error fetching data:", err);
        }
        setOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel the request on component unmount
    return () => {
      if (source) {
        source.cancel("Component unmounted");
      }
    };
  }, [keyword, props.search]);

  // Update search state when the prop value changes
  useEffect(() => {
    setSearch(props.value);
  }, [props.value]);

  // Destructure city and airport from props.search
  const { city, airport } = props.search;
  const label =
    city && airport ? "City and Airports" : city ? "City" : airport ? "Airports" : "";

  // Render the Autocomplete component
  return (
    <Autocomplete
      className={`w-full sm:w-[418px] font-Montserrat ${classes.autoComplete}`} // Apply responsive classes
      id="asynchronous-demo"
      open={open}
      onOpen={() => {
        setOpen(true); // Open dropdown
      }}
      onClose={() => {
        setOpen(false); // Close dropdown
      }}
      getOptionSelected={(option, value) => option.name === value.name} // Select option based on name match
      onChange={(e, value: OptionType | null) => {
        if (value) {
          props.setSearch((p) => ({ ...p, keyword: value.name, page: 0 }));
          setSearch(value.name);
          props.setAirportCode(value.airportCode);
          props.setValue(value.name); // Update the value prop
        } else {
          setSearch("");
          props.setSearch((p) => ({ ...p, keyword: "a", page: 0 }));
          props.setValue(""); // Update the value prop
        }
      }}
      getOptionLabel={(option: OptionType) => option.name} // Get option label from name
      options={options} // Set available options
      loading={loading} // Show loading state
      value={
        options.find((option) => option.name === props.value) || {
          name: props.value,
          type: "",
          airportCode: "",
        }
      } // Control the value of the Autocomplete
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(e) => {
            e.preventDefault();
            setSearch(e.target.value);
            props.setValue(e.target.value); // Sync the input value with the prop value
          }}
          variant="outlined"
          className={`${classes.textField} ${classes.inputBase}`} // Apply custom styling
          placeholder="From"
          inputProps={{
            ...params.inputProps,
            value: search,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}{" "}
                {/* Show spinner when loading */}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default FromSearchAutocomplete;
